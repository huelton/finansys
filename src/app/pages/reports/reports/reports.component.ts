import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Category } from '../../categories/shared/category.model';
import { CategoryService } from '../../categories/shared/category.service';

import { Entry } from '../../entries/shared/entry.model';
import { EntryService } from '../../entries/shared/entry.service';

import currencyFormatter from 'currency-formatter';
import * as numeral from 'numeral';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  expenseTotal: any = 0;
  revenueTotal: any = 0;
  balance: any = 0;

  expenseChartTotal: any;
  revenueChartTotal: any;

  chartOptions = {
    scales: {
      yAxes: [{
          ticks: {
            beginAtZero: true
          }
      }]
    }
  }

  categories: Category[] = [];
  entries: Entry[] = [];

  // encontrado pelas variaveis #month, #year
  @ViewChild('month') month: ElementRef = null;
  @ViewChild('year') year: ElementRef = null;

  constructor(
    private categoryService: CategoryService,
    private entryService: EntryService
  ) { }

  ngOnInit() {

    this.categoryService.getAll()
        .subscribe(categories => this.categories =  categories);
  }

  generateReports() {
    const month = this.month.nativeElement.value;
    const year = this.year.nativeElement.value;

    if(!month || !year)
      alert('Necessario selecionar o Mês e o Ano para gerar os relatorios');
    else
      this.entryService.getByMonthAndYear(month, year).subscribe(this.setValues.bind(this))
  }

  private setValues(entries: Entry[])  {
    this.entries = entries;
    this.calculateBalance();
    this.setChartDate();
  }

  private calculateBalance() {
    let expenseTotal = 0;
    let revenueTotal = 0;

    this.entries.forEach(entry => {
      if(entry.type == 'revenue')                                // DIGO O FORMATO QUE ESTA
        revenueTotal += currencyFormatter.unformat(entry.amount, { code: 'BRL'});
      else                                                       // DIGO O FORMATO QUE ESTA
        expenseTotal += currencyFormatter.unformat(entry.amount, { code: 'BRL'});
    });

      this.expenseTotal = currencyFormatter.format(expenseTotal, { code: 'BRL'});
      this.revenueTotal = currencyFormatter.format(revenueTotal, { code: 'BRL'});
      this.balance = currencyFormatter.format(revenueTotal - expenseTotal, { code: 'BRL'});

  }

  private setChartDate() {
    this.revenueChartTotal = this.getChartDate('revenue', 'Gráfico de Receitas', '#9CCC65');
    this.expenseChartTotal = this.getChartDate('expense', 'Gráfico de Despesas', '#E03131');
  }

  private getChartDate(entryType: string, title: string, color: string) {

      const chartData = [];
      this.categories.forEach(category => {
        //Filtering entries by category and type
        const filteredEntries = this.entries.filter(
          entry => (entry.categoryId == category.id) && (entry.type == entryType));

        // If found entries, then sum entries amount and add to chartData
        if(filteredEntries.length > 0){
           const totalAmount = filteredEntries.reduce(
             (total, entry) => total + currencyFormatter.unformat(entry.amount, { code: 'BRL'}), 0
           )

           chartData.push({
             categoryName: category.name,
             totalAmount: totalAmount
           })
        }
      });

      return {
        labels: chartData.map(item => item.categoryName),
        datasets: [{
          label: title,
          backgroundColor: color,
          data: chartData.map(item => item.totalAmount)
        }]
      }

  }

}
