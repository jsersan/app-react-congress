import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonContent, IonPage, IonButtons, IonMenuButton, IonButton, IonIcon, IonDatetime, IonSelectOption, IonList, IonItem, IonLabel, IonSelect, IonPopover, IonText } from '@ionic/react';
import './About.scss';
import { ellipsisHorizontal, ellipsisVertical } from 'ionicons/icons';
import AboutPopover from '../components/AboutPopover';
import { format, parseISO } from 'date-fns';

interface AboutProps { }

const About: React.FC<AboutProps> = () => {

  const [showPopover, setShowPopover] = useState(false);
  const [popoverEvent, setPopoverEvent] = useState<MouseEvent>();
  const [location, setLocation] = useState<'vitoria' | 'bilbao' | 'donostia' | 'las palmas'>('vitoria');
  const [conferenceDate, setConferenceDate] = useState('2022-06-18T00:00:00-05:00');

  const selectOptions = {
    header: 'Selecciona una localización'
  };

  const presentPopover = (e: React.MouseEvent) => {
    setPopoverEvent(e.nativeEvent);
    setShowPopover(true);
  };

  function displayDate(date: string, dateFormat: string) {
    return format(parseISO(date), dateFormat);
  }

  return (
    <IonPage id="about-page">
      <IonContent>
        <IonHeader className="ion-no-border">
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonButtons slot="end">
              <IonButton onClick={presentPopover}>
                <IonIcon slot="icon-only" ios={ellipsisHorizontal} md={ellipsisVertical}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <div className="about-header">
          {/* Instead of loading an image each time the select changes, use opacity to transition them */}
          <div className="about-image madison" style={{'opacity': location === 'vitoria' ? '1' : undefined}}></div>
          <div className="about-image austin" style={{'opacity': location === 'bilbao' ? '1' : undefined}}></div>
          <div className="about-image chicago" style={{'opacity': location === 'donostia' ? '1' : undefined}}></div>
          <div className="about-image seattle" style={{'opacity': location === 'las palmas' ? '1' : undefined}}></div>
        </div>
        <div className="about-info">
          <h3 className="ion-padding-top ion-padding-start">Acerca de...</h3>

          <p className="ion-padding-start ion-padding-end">
          La Conferencia Ionic es una conferencia programada para el {displayDate(conferenceDate, 'MMM dd, yyyy') } con charlas del equipo Ionic. Se centra en las aplicaciones Ionic que se construyen con Ionic Framework. Esto incluye la migración de aplicaciones a la última versión del marco, conceptos Angular, Webpack, SASS y muchas otras tecnologías utilizadas en Ionic 2. Las entradas están completamente agotadas y esperamos más de 1000 desarrolladores, lo que la convierte en la conferencia Ionic más grande celebrada.
          </p>

          <h3 className="ion-padding-top ion-padding-start">Detalles</h3>

          <IonList lines="none">
            <IonItem>
              <IonLabel>
                Localización
              </IonLabel>
              <IonSelect value={location} interfaceOptions={selectOptions} onIonChange={(e) => setLocation(e.detail.value as any)}>
                <IonSelectOption value="vitoria">Vitoria</IonSelectOption>
                <IonSelectOption value="bilbao">Bilbao</IonSelectOption>
                <IonSelectOption value="donostia">Donostia</IonSelectOption>
                <IonSelectOption value="las palmas">Las Palmas</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem button={true} id="open-date-input">
              <IonLabel>
                Fecha
              </IonLabel>
              <IonText slot="end">{displayDate(conferenceDate, 'MMM dd, yyyy')}</IonText>
              <IonPopover id="date-input-popover" trigger="open-date-input" showBackdrop={false} side="top" alignment="end">
                <IonDatetime
                  max="2056"
                  value={conferenceDate}
                  onIonChange={(e) => setConferenceDate(e.detail.value!)}
                  presentation="date">
                </IonDatetime>
              </IonPopover>
            </IonItem>
          </IonList>

          <h3 className="ion-padding-top ion-padding-start">Internet</h3>

          <IonList lines="none">
            <IonItem>
              <IonLabel>
                Clave de red Wifi
              </IonLabel>
              <IonLabel className="ion-text-end">
                ica{ displayDate(conferenceDate, 'y') }
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>
               Contraseña
              </IonLabel>
              <IonLabel className="ion-text-end">
                makegoodthings
              </IonLabel>
            </IonItem>
          </IonList>

        </div>
      </IonContent>

      <IonPopover
        isOpen={showPopover}
        event={popoverEvent}
        onDidDismiss={() => setShowPopover(false)}
      >
        <AboutPopover dismiss={() => setShowPopover(false)} />
      </IonPopover>
    </IonPage>
  );
};

export default React.memo(About);