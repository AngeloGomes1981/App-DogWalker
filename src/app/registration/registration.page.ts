import { Component } from '@angular/core'; 
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

interface User {
  nome: string;
  telefone: string;
  endereco: string;
  interesse: string;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage {
  form: User = {
    nome: '',
    telefone: '',
    endereco: '',
    interesse: ''
  };

  users: User[] = []; // Array para armazenar os dados cadastrados

  constructor(private firestore: AngularFirestore, private toastController: ToastController) {
    this.loadUsers();
  }

  async cadastrar(form: NgForm) {
    try {
      await this.firestore.collection('usuarios').add(this.form);
      this.users.push({ ...this.form });
      this.presentToast('Cadastro realizado com sucesso!');
      this.resetForm(form); // Chama a função resetForm após o cadastro
    } catch (error) {
      this.presentToast('Erro ao realizar cadastro. Tente novamente.');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.form = {
      nome: '',
      telefone: '',
      endereco: '',
      interesse: ''
    };
  }

  async loadUsers() {
    this.firestore.collection<User>('usuarios').valueChanges().subscribe(data => {
      this.users = data;
    });
  }
}
