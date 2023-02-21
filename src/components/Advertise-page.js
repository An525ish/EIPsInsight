import React from 'react'

import styles from './Advertise-page.module.css'

const advertise = () => {
  return (
    <>
      <section>
        <section className={styles['advertise-heading-container']}>
          <div className={styles['advertise-heading-info']}>
            <p>Advertise on Etherworld</p>
            <h1>Show your stuff to The Crypto Community and Developers Worldwide!!</h1>
            <button>Contact Us</button>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1559445368-b8a993676d7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1931&q=80"
              alt="Ad Image"
            />
          </div>
        </section>
        <section className={styles['advertise-info']}>
          <h1>Why Choose US?</h1>
          <p>EIPs Insights is a leading EIPs analytical statistics dashboard, used by millions of people out there.</p>
          <h1 style={{fontSize:"25px"}}>Types of Advertisements</h1>
          <p>
            Extend your reach to thousands of people related with the Blockchain Community. Your ads
            will be tailored in our site to provide a seamless experience.
          </p>
        </section>
        <section>
          <form action="" className={styles['advertise-form']}>
            <h1>Contact Us to get started</h1>
            <p>
              Provide the following information to kick start the process of connecting you with
              people. For any other queries click here.
            </p>
            <div className={styles['advertise-form-first-row']}>
              <input type="text" placeholder="Contact Name*" />
              <input type="email" placeholder="Email*" />
            </div>
            <input type="text" placeholder="Official Website URL*" />
            <input type="text" placeholder="Company/Project Name*" />
            <input type="text" placeholder="Describe your Advert here*" />
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Comments or Questions"
            ></textarea>
            <button>Send Message</button>
          </form>
        </section>
      </section>
    </>
  )
}

export default advertise
