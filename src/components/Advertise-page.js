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
              src="https://www.coindesk.com/resizer/XZ-sCAQPWnlAclvdUY_-yaokpKA=/1200x600/center/top/cloudfront-us-east-1.images.arcpublishing.com/coindesk/72PSYBTMM5D2VD3WI745EU6NII"
              alt="Ad Image"
            />
          </div>
        </section>
        <section className={styles['advertise-info']}>
          <h1>Why Choose US?</h1>
          <p>
            EIPs Insights is a leading EIPs analytical statistics dashboard, used by millions of
            people out there.
          </p>
          <div className={styles['advertise-milestones']}>
            <div>
              <h1>#1</h1>
              <p>Eips Dashboard</p>
            </div>
            <div>
              <h1>10K+</h1>
              <p>Page Views per Month</p>
            </div>
            <div>
              <h1>1K</h1>
              <p>Unique Visitors per Month</p>
            </div>
          </div>
          <h1 style={{ fontSize: '25px' }}>Types of Advertisements</h1>
          <p>
            Extend your reach to thousands of people related with the Blockchain Community. Your ads
            will be tailored in our site to provide a seamless experience.
          </p>

          <div>
            <div className={styles['advertise-banner-info']}>
              <div className={styles['advertise-banner-content']}>
                <h1>Prominent Banner Ad</h1>
                <p>
                  Create awareness and acquire users through our banner that ranges across the whole
                  homepage. Let users pause and admire your brand through a creative display.
                </p>
              </div>
              <img src="" alt="" />
            </div>
            <div className={styles['advertise-banner-info']}>
              <div className={styles['advertise-banner-content']}>
                <h1>Header Text Ad</h1>
                <p>
                  Your sponsored text will appear in a clean and easily digestible fashion at the
                  top of the page. Transparent payment with a CPM model.
                </p>
              </div>
              <img src="" alt="" />
            </div>
          </div>
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
