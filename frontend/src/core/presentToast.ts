export async function presentToast(message: string) {
    const toast = document.createElement('ion-toast');
    toast.message = message;
    toast.duration = 3000;
  
    document.body.appendChild(toast);
    return toast.present();
}