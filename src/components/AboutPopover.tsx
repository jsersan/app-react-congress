import React from 'react';
import { IonList, IonItem, IonLabel } from '@ionic/react';

interface AboutPopoverProps {
  dismiss: () => void;
};

const AboutPopover: React.FC<AboutPopoverProps> = ({dismiss}) => {

  const close = (url: string) => {
    window.open(url, '_blank');
    dismiss();
  };

  return (
    <IonList>
      <IonItem button onClick={() => close('https://ionicframework.com/getting-started')}>
        <IonLabel>Aprende Ionic</IonLabel>
      </IonItem>
      <IonItem button onClick={() => close('https://ionicframework.com/docs/react')}>
        <IonLabel>Documentación</IonLabel>
      </IonItem>
      <IonItem button onClick={() => close('https://showcase.ionicframework.com')}>
        <IonLabel>Caso práctico</IonLabel>
      </IonItem>
      <IonItem button onClick={() => close('https://github.com/ionic-team/ionic')}>
        <IonLabel>Respositorio GitHub</IonLabel>
      </IonItem>
      <IonItem button onClick={dismiss}>
        <IonLabel>Soporte</IonLabel>
      </IonItem>
    </IonList >
  )
}

export default AboutPopover;