import React from 'react';
import Link from 'next/link';
import './stylesOwnPage.css';

function Homepage() {

  const verticalSpacing = {
    marginBottom: '2rem', // Ajusta este valor según necesites
  };

  return (
    <main>

      <div className="container py-4">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-center fixed-top">
          <div className="container d-flex justify-content-between">
            <Link href="/" className="navbar-brand">
              <img src="https://boardgamemanufacturing.com/wp-content/uploads/2019/04/free-parking1.png" alt="Logo" style={{ height: '60px' }} />
            </Link>
            <div className="d-flex flex-row">
              <ul className="navbar-nav d-flex flex-row navbar-list">
                <li className="nav-item" style={{ marginLeft: '10px' }}>
                  <Link href="#" className="nav-link active nav-item-margin" aria-current="page">¿Qué es el proyecto APQ?</Link>
                </li>
                <li className="nav-item">
                  <Link href="#" className="nav-link active nav-item-margin" aria-current="page">¿Quiénes somos?</Link>
                </li>
                <li className="nav-item">
                  <Link href="#" className="nav-link active nav-item-margin" aria-current="page">Contáctanos</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light">
                    <Link href="/auth/login" className="nav-link active" aria-current="page">Acceder</Link>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className='mt-5 p-3' style={verticalSpacing}>
          <header className="text-white m-2 py-3" style={{
            backgroundImage: 'url("https://content.r9cdn.net/rimg/dimg/cc/78/4dd70310-city-18972-169edc202ea.jpg?width=1366&height=768&xhint=2841&yhint=2969&crop=true")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }}></div>
            <div className="container px-4 text-center p-3" style={{ position: 'relative' }}>
              <h1 className="fw-bolder">Bienvenido a la web PJ-APQ</h1>
              <p className="lead">La pagina web principal del proyecto APQ.</p>
              <a className="btn btn-lg btn-light" href="#about">Ver aplicacion en PlayStore!</a>
            </div>
          </header>

          <section className="h-100 py-5 border-bottom bg-light m-2 mt-4" id="features" style={verticalSpacing}>
            <div className="container px-5 my-5">
              <div className="row gx-5">
                <div className="col-lg-4 mb-5 mb-lg-0">
                  <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                    <i className="bi bi-collection"></i>
                  </div>
                  <h2 className="h4 fw-bolder d-flex align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-patch-question" viewBox="0 0 16 16" style={{ marginRight: '10px' }}>
                      <path d="M8.05 9.6c.336 0 .504-.24.554-.627.04-.534.198-.815.847-1.26.673-.475 1.049-1.09 1.049-1.986 0-1.325-.92-2.227-2.262-2.227-1.02 0-1.792.492-2.1 1.29A1.7 1.7 0 0 0 6 5.48c0 .393.203.64.545.64.272 0 .455-.147.564-.51.158-.592.525-.915 1.074-.915.61 0 1.03.446 1.03 1.084 0 .563-.208.885-.822 1.325-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745" />
                      <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z" />
                      <path d="M7.001 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0" />
                    </svg>
                    Como funciona?
                  </h2>
                  <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                  <a className="text-decoration-none" href="#!">
                    Call to action
                    <i className="bi bi-arrow-right"></i>
                  </a>
                </div>
                <div className="col-lg-4 mb-5 mb-lg-0">
                  <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                    <i className="bi bi-collection"></i>
                  </div>
                  <h2 className="h4 fw-bolder d-flex align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-patch-question" viewBox="0 0 16 16" style={{ marginRight: '10px' }}>
                      <path d="M8.05 9.6c.336 0 .504-.24.554-.627.04-.534.198-.815.847-1.26.673-.475 1.049-1.09 1.049-1.986 0-1.325-.92-2.227-2.262-2.227-1.02 0-1.792.492-2.1 1.29A1.7 1.7 0 0 0 6 5.48c0 .393.203.64.545.64.272 0 .455-.147.564-.51.158-.592.525-.915 1.074-.915.61 0 1.03.446 1.03 1.084 0 .563-.208.885-.822 1.325-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745" />
                      <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z" />
                      <path d="M7.001 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0" />
                    </svg>
                    Tiene algun costo?
                  </h2>
                  <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                  <a className="text-decoration-none" href="#!">
                    Call to action
                    <i class="bi bi-arrow-right"></i>
                  </a>
                </div>
                <div className="col-lg-4 mb-5 mb-lg-0">
                  <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                    <i className="bi bi-collection"></i>
                  </div>
                  <h2 className="h4 fw-bolder d-flex align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-patch-question" viewBox="0 0 16 16" style={{ marginRight: '10px' }}>
                      <path d="M8.05 9.6c.336 0 .504-.24.554-.627.04-.534.198-.815.847-1.26.673-.475 1.049-1.09 1.049-1.986 0-1.325-.92-2.227-2.262-2.227-1.02 0-1.792.492-2.1 1.29A1.7 1.7 0 0 0 6 5.48c0 .393.203.64.545.64.272 0 .455-.147.564-.51.158-.592.525-.915 1.074-.915.61 0 1.03.446 1.03 1.084 0 .563-.208.885-.822 1.325-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745" />
                      <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911z" />
                      <path d="M7.001 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0" />
                    </svg>
                    Como me postulo?
                  </h2>
                  <p>Paragraph of text beneath the heading to explain the heading. We'll add onto it with another sentence and probably just keep going until we run out of words.</p>
                  <a className="text-decoration-none" href="#!">
                    Call to action
                    <i className="bi bi-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </section>

          <div className="row align-items-md-stretch mt-4">
            <div className="col-md-6">
              <div className="h-100 p-5 text-bg-dark rounded-3">
                <h2>Change the background</h2>
                <p>Swap the background-color utility and add a `.text-*` color utility to mix up the jumbotron look. Then, mix and match with additional component themes and more.</p>
                <button className="btn btn-outline-light" type="button">Example button</button>
              </div>
            </div>
            <div className="col-md-6">
              <div className="h-100 p-5 bg-body-tertiary border rounded-3">
                <h2>Add borders</h2>
                <p>Or, keep it light and add a border for some added definition to the boundaries of your content. Be sure to look under the hood at the source HTML here as we've adjusted the alignment and sizing of both column's content for equal-height.</p>
                <button className="btn btn-outline-secondary" type="button">Example button</button>
              </div>
            </div>
          </div>
        </div>

        <footer className="pt-3 mt-4 text-body-secondary border-top bg-light">
          &copy; 2023 PJ-APQ
        </footer>
      </div>

    </main>
  )
}

export default Homepage