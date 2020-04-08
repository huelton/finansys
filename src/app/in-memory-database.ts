import { InMemoryDbService } from "angular-in-memory-web-api";
import { Category } from "./pages/categories/shared/category.model";
import { Entry } from "./pages/entries/shared/entry.model";


export class InMemoryDatabase implements InMemoryDbService {

   createDb(){
     const categories: Category[] = [
        { id: 1, name:'Moradia', description: 'Pagamentos de Contas da Casa' },
        { id: 2, name:'Saude', description: 'Plano de Saude e Remedios' },
        { id: 3, name:'Lazer', description: 'Cinema, Parques, Praia, etc' },
        { id: 4, name:'Salario', description: 'Recebimento de Salario' },
        { id: 5, name:'Freelas', description: 'Trabalhos como Freelancer' }
     ];

     const entries: Entry[] = [
        { id: 1, name: 'Gas de cozinha',categoryId: categories[0].id, category: categories[0], paid: true, date: "14/10/2018", amount: "70,80",type: "expense",  description: 'Pagamentos de Contas da Casa' } as Entry,
        { id: 2, name: 'Suplementos',categoryId: categories[1].id, category: categories[1], paid: false, date: "14/10/2018", amount: "15,00",type: "expense"} as Entry,
        { id: 3, name: 'Salario na empresaX',categoryId: categories[3].id, category: categories[3], paid: true, date: "15/10/2018", amount: "4405,40",type: "revenue" } as Entry,
        { id: 4, name: 'Aluguel de Filmes',categoryId: categories[2].id, category: categories[2], paid: true, date: "16/10/2018", amount: "15,00",type: "expense" } as Entry,
        { id: 5, name: 'Suplementos',categoryId: categories[1].id, category: categories[1], paid: true, date: "17/10/2018", amount: "30,00",type: "expense" } as Entry,
        { id: 6, name: 'Video Game da Filha',categoryId: categories[2].id, category: categories[2], paid: false, date: "17/10/2018", amount: "155,00",type: "expense" } as Entry,
        { id: 7, name: 'Uber',categoryId: categories[1].id, category: categories[1], paid: true, date: "17/10/2018", amount: "30,00",type: "expense" } as Entry,
        { id: 8, name: 'Aluguel Casa',categoryId: categories[0].id, category: categories[0], paid: false, date: "23/10/2018", amount: "500,00",type: "expense"} as Entry,
        { id: 9, name: 'Gas de cozinha',categoryId: categories[0].id, category: categories[0], paid: false, date: "25/10/2018", amount: "70,80",type: "expense" } as Entry,
        { id: 10, name: 'Pagamento pelo projetoXYZ',categoryId: categories[4].id, category: categories[4], paid: true, date: "25/10/2018", amount: "2290,00",type: "revenue" } as Entry,
        { id: 11, name: 'Aluguel de Filmes',categoryId: categories[2].id, category: categories[2], paid: false, date: "07/11/2018", amount: "15,00",type: "expense" } as Entry,
        { id: 12, name: 'Cinema',categoryId: categories[2].id, category: categories[2], paid: true, date: "17/11/2018", amount: "30,00",type: "expense" } as Entry
     ];

     return { categories, entries }
   }

}
