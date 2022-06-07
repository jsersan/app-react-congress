import React, { useState } from 'react';
import { IonContent, IonPage, IonHeader, IonToolbar, IonButtons, IonButton, IonIcon, useIonViewWillEnter } from '@ionic/react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import { Swiper as SwiperCore } from 'swiper';
import { arrowForward } from 'ionicons/icons';
import { setMenuEnabled } from '../data/sessions/sessions.actions';
import { setHasSeenTutorial } from '../data/user/user.actions';
import './Tutorial.scss';
import 'swiper/swiper.min.css';
import '@ionic/react/css/ionic-swiper.css';
import { connect } from '../data/connect';
import { RouteComponentProps } from 'react-router';

interface OwnProps extends RouteComponentProps {};

interface DispatchProps {
  setHasSeenTutorial: typeof setHasSeenTutorial;
  setMenuEnabled: typeof setMenuEnabled;
}

interface TutorialProps extends OwnProps, DispatchProps { };

const Tutorial: React.FC<TutorialProps> = ({ history, setHasSeenTutorial, setMenuEnabled }) => {
  const [showSkip, setShowSkip] = useState(true);
  let [swiper, setSwiper] = useState<SwiperCore>();

  useIonViewWillEnter(() => {
    setMenuEnabled(false);
  });
  
  const startApp = async () => { 
    await setHasSeenTutorial(true);
    await setMenuEnabled(true);
    history.push('/tabs/schedule', { direction: 'none' });
  };

  const handleSlideChangeStart = () => { 
    if(!swiper) return;
    setShowSkip(!swiper.isEnd);
  };

  return (
    <IonPage id="tutorial-page">
      <IonHeader no-border>
        <IonToolbar>
          <IonButtons slot="end">
            {showSkip && <IonButton color='primary' onClick={startApp}>Skip</IonButton>}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <Swiper onSwiper={setSwiper} onSlideChangeTransitionStart={handleSlideChangeStart}>
          <SwiperSlide>
            <img src="assets/img/ica-slidebox-img-1.png" alt="" className="slide-image" />
            <h2 className="slide-title">
              Bienvenido a <b>CIFP Ciudad Jardín</b>
            </h2>
            <p>
            La <b>aplicación de conferencia de Ionic</b> es una vista previa práctica del marco de Ionic en acción y una demostración del uso adecuado del código.
            </p>
          </SwiperSlide>

          <SwiperSlide>
            <img src="assets/img/ica-slidebox-img-2.png" alt="" className="slide-image" />
            <h2 className="slide-title">¿Qué es Ionic?</h2>
            <p>
              <b>Ionic Framework</b> es un SDK de código abierto que permite a los desarrolladores crear aplicaciones móviles de alta calidad con tecnologías web como HTML, CSS y JavaScript.
            </p>
          </SwiperSlide>

          <SwiperSlide>
            <img src="assets/img/ica-slidebox-img-3.png" alt="" className="slide-image" />
            <h2 className="slide-title">¿Qué es el Ionic Appflow?</h2>
            <p>
              <b>Ionic Appflow</b> es un poderoso conjunto de servicios y funciones construido sobre Ionic Framework que brinda un nivel totalmente nuevo de agilidad en el desarrollo de aplicaciones para los equipos de desarrollo móvil.
            </p>
          </SwiperSlide>

          <SwiperSlide>
            <img src="assets/img/ica-slidebox-img-4.png" alt="" className="slide-image" />
            <h2 className="slide-title">Preparado para empezar?</h2>
            <IonButton fill="clear" onClick={startApp}>
              Continue
              <IonIcon slot="end" icon={arrowForward} />
            </IonButton>
          </SwiperSlide>
        </Swiper>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: ({
    setHasSeenTutorial,
    setMenuEnabled
  }),
  component: Tutorial
});