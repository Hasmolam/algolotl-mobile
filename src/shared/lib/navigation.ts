import { router } from 'expo-router';

// Ders sonu, seri ve lig ekranlarından sonra öğrenme yoluna temiz bir geçmişle
// döner: araya giren ekranlar yığından çıkarılır, geri tuşu onlara dönmez.
export function returnToLearningPath() {
  if (router.canDismiss()) {
    router.dismissAll();
  }
  router.replace('/learn');
}
