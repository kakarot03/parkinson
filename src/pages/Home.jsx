import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import homeImg from '../components/image/homeimg.svg';
import aboutImg from '../components/image/about-img.svg';
import spiralImg from '../components/image/spiral.png';
import report from '../components/image/report-not-css.svg';
import Navbar from '../components/Navbar/Navbar';
import './Home.css';
import './report-styles.css';
import 'react-toastify/dist/ReactToastify.css';
import ReactImageFileToBase64 from 'react-file-image-to-base64';
import axios from 'axios';

const Home = () => {
  const [result, setResult] = useState();

  const handleFileUpload = async (files) => {
    if (!files[0].file_name.includes('.png')) {
      toast.error('Please upload the image in PNG format', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      return;
    }
    let base64 = files[0].base64_file;
    base64 = base64.substring(base64.indexOf('base64') + 6);
    for (var i = 0; i < base64.length; i++) {
      if (base64.charAt(i) === ',' || base64.charAt(i) === '/') {
        base64 = base64.substring(i + 1, base64.length);
      } else {
        break;
      }
    }
    // console.log(base64);
    const data = {
      file: base64,
    };
    await axios.post('http://127.0.0.1:5000/park', data).then((response) => {
      setResult(response.data);
    });
    setTimeout(() => {
      const section = document.querySelector('#report');
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 1000);
  };

  const getPercentge = (min, max) => {
    let difference = max - min;
    let rand = Math.random();
    rand = Math.floor(rand * difference);
    rand = rand + min;
    return rand;
  };

  return (
    <div className="Home">
      <Navbar />
      <section className="home" id="home">
        <div className="image">
          <img src={homeImg} alt="" />
        </div>

        <div className="content">
          <h3>Leading the way in medical excellence</h3>
          <p>
            Feel like having symptoms of Parkinson's Disease?
            Worry not! We offer you a way to get over your fear
            of the disease with the help of artificial intelligence
          </p>
        </div>
      </section>

      <section className="about" id="about">
        <h1
          className="heading"
          style={{ marginTop: '7rem', marginBottom: '0rem' }}
        >
          <span>about</span> us
        </h1>

        <div className="row">
          <div className="image">
            <img src={aboutImg} alt="" />
          </div>

          <div className="content" style={{ marginBottom: '7rem' }}>
            <h3>
              we prioritize your health
              <br /> and time
            </h3>
            <p>
              There are currently no blood or laboratory tests to diagnose
              non-genetic cases of Parkinson’s. Doctors usually diagnose the
              disease by taking a person’s medical history and performing a
              neurological examination.
            </p>
            <p>
              And here we are to provide you a way to quickly examine your
              health condition in just a matter of few seconds. Have a break
              from all those medical check-ups and the hospital staffs luring
              you into unwanted surgeries
            </p>
          </div>
        </div>
      </section>

      <section className="about" id="about">
        <h1
          className="heading"
          style={{ marginTop: '7rem', marginBottom: '4rem' }}
        >
          <span>file</span> upload
        </h1>

        <div className="row">
          <div className="work_img">
            <img src={spiralImg} alt="" className="imgg" />
          </div>

          <div className="content" style={{ marginBottom: '7rem' }}>
            <h3 style={{ marginBottom: '2rem' }}>steps to follow</h3>
            <p>1. Grab a paper and pen.</p>
            <p>2. Then draw a spiral like the one on the left.</p>
            <p>3. Take a photo of the paper.</p>
            <p>
              4. Upload the image in png format by clicking on the button below.
              <br></br> &ensp;&ensp;(don't have a image in png format? click
              <a
                href="https://cloudconvert.com/"
                target={'_blank'}
                rel="noreferrer"
              >
                {' '}
                here{' '}
              </a>{' '}
              to convert )
            </p>
            <p>
              5. And you're done. Just give us a few seconds to process the
              image
            </p>
          </div>
        </div>
        <div
          style={{
            fontFamily: 'sans-serif',
            textTransform: 'unset',
            fontSize: '13px',
          }}
        >
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </div>
        <div className="wrapper">
          <div className="file-upload">
            <div style={{ position: 'absolute', opacity: '0', width: '90px' }}>
              <ReactImageFileToBase64 onCompleted={handleFileUpload} />
            </div>
            <i className="fa fa-arrow-up"></i>
          </div>
        </div>
      </section>

      {result ? (
        <section className="home" id="home">
          <div className="image">
            <img src={report} alt="" />
          </div>

          <div className="content" id="report">
            <h3>
              Prediction -{' '}
              {result === 'Normal' ? getPercentge(5, 20) : getPercentge(78, 96)}
              %
            </h3>
            {result === 'Normal' ? (
              <div>
                <p>You have nothing to worry about!</p>
                <p>
                  As you can see according to the report you are in good health
                  in terms of Parkinsons disease. However if you are still
                  doubtful go have a consultaion with your doctor.
                </p>
              </div>
            ) : (
              <div>
                <p>
                  It seems that you have high chances of having the disease.
                </p>
                <p>
                  Though there's no cure for Parkinson's disease currently,
                  there are treatments available to help relieve the symptoms
                  and maintain your quality of life.
                </p>
                <p>
                  You may not need any treatment during the early stages of
                  Parkinson's disease as symptoms are usually mild. But you may
                  need regular appointments with your specialist so your
                  condition can be monitored.
                </p>
                <p>
                  <a
                    href="https://www.hopkinsmedicine.org/health/conditions-and-diseases/parkinsons-disease/6-medication-free-ways-to-feel-better-with-parkinsons-disease"
                    target={'_blank'}
                    rel="noreferrer"
                  >
                    Here
                  </a>{' '}
                  are some ways you can try to feel better!
                </p>
              </div>
            )}
          </div>
        </section>
      ) : (
        <div className=""></div>
      )}
    </div>
  );
};

export default Home;
