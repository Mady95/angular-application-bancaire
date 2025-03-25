export function copyToClipboard(text: string): void {
  navigator.clipboard.writeText(text).then(() => {
    console.log('📋 Copié dans le presse-papier :', text);
  }).catch(err => {
    console.error('Erreur lors de la copie :', err);
    alert('❌ Erreur lors de la copie.');
  });
}
