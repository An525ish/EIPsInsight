import React from 'react'

import styles from './resource-page.module.css'

const videoresources = [
  {
    path: 'https://www.youtube.com/embed/AyidVR6X6J8',
    name: 'EIPs & Standardization Process',
    id: 1,
  },
  {
    path: 'https://www.youtube.com/embed/dEgBVAzY6Eg',
    name: 'Sign-In with Ethereum: EIP-4361',
    id: 2,
  },
  {
    path: 'https://www.youtube.com/embed/fwxkbUaa92w',
    name: 'EIP-20: Token Standard',
    id: 3,
  },
  {
    path: 'https://www.youtube.com/embed/pO8fmZd4Mjw',
    name: 'EIP-721: Non-Fungible Token Standard',
    id: 4,
  },
  {
    path: 'https://www.youtube.com/embed/V75TPvK-K_s',
    name: 'Fractional NFTs: EIP-4675 using EIP-1155 & EIP-1633',
    id: 5,
  },
]

const blogresources = [
  {
    path: 'https://etherworld.co/2023/01/21/sign-in-with-ethereum-eip-4361/',
    name: 'Transient Storage for Beginners',
    desc: 'Transient Storage is already conceptually in the EVM. It is more than a gas optimization. It makes feasible new patterns for smart contracts that are much easier to work with.',
    image: 'https://etherworld.co/content/images/size/w2000/2022/12/Copy-of-EW-Assets--3-.jpg',
    id: 1,
  },
  {
    path: 'https://medium.com/ethereum-cat-herders/shedding-light-on-the-ethereum-network-upgrade-process-4c6186ed442c',
    name: 'Ethereum Network Upgrade Process',
    desc: 'Network upgrades are the way by which new features get added to the Ethereum protocol. These upgrades aim to bring scalability, UX, and security improvements to the network.',
    image: '	https://miro.medium.com/v2/resize:fit:828/format:webp/1*Nsi3bfHqQzVhTb34P1m4VQ.png',
    id: 2,
  },
  {
    path: 'https://etherworld.co/2023/01/13/how-warm-coinbase-helps-in-gas-cost-reduction/#section1',
    name: 'How Warm COINBASE helps in Gas Cost Reduction?',
    desc: 'EIP-3651 makes the COINBASE warm. Previously, Accessing COINBASE is overpriced because the address is initially cold under the access list framework introduced in EIP-2929.',
    image: '	https://etherworld.co/content/images/size/w2000/2023/01/Cover-images--1-.png',
    id: 3,
  },
  {
    path: 'https://etherworld.co/2022/10/07/ethereum-post-merge-hardfork-for-execution-layer/',
    name: 'Ethereum Post-Merge Hardfork for Execution Layer',
    desc: 'According to the proposal, nodes on the blockchain network try to find each other by establishing a random connection to remote machines that look like Ethereum nodes hoping they find a useful peer.',
    image: '	https://etherworld.co/content/images/size/w2000/2022/10/X2xRviP.png',
    id: 4,
  },
  {
    path: 'https://medium.com/ethereum-cat-herders/shedding-light-on-the-ethereum-network-upgrade-process-4c6186ed442c',
    name: 'What do Bellatrix, Paris & TTD mean in Ethereum Merge Upgrade?',
    desc: 'A quick guide to Bellatrix, Paris & TTD in The Merge Upgrade - How was the name decided?, Expected Changes, Validator responsibilities, Networking Fork Choice & much more.',
    image: '	https://miro.medium.com/v2/resize:fit:828/format:webp/1*Nsi3bfHqQzVhTb34P1m4VQ.png',
    id: 5,
  },
  {
    path: 'https://etherworld.co/2021/10/06/an-overview-of-account-abstraction-in-ethereum-blockchain/',
    name: 'An overview of Account Abstraction in Ethereum blockchain',
    desc: 'Account abstraction in Ethereum has the goal of creating a single account type that will have all the relevant aspects included and none of the extraneous ones making the developers life easier.',
    image: 'https://etherworld.co/content/images/size/w2000/2021/10/Screenshot-2021-10-05-164617.jpg',
    id: 6,
  },
]

function resource() {
  return (
    <>
      <img
        style={{ height: '300px', width: '100%' }}
        src="https://static.psa.gov.in/psa-prod/styles/image_1366x520/s3/2021-12/IIT%20Madras%20Researchers%20Develop%20Blockchain-based%20Healthcare%20Information%20Systems%20-%20header%20banner.png?itok=HoQJ6o0f"
        alt="resource"
      />

      {/* Videos Section */}
      <h1 className={styles['section-heading']}>Videos Section</h1>
      <p className={styles['section-description']}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam totam corrupti impedit
        nemo minus asperiores cumque saepe fuga. Quibusdam voluptate eum laborum debitis veniam
        repellendus asperiores commodi est corrupti voluptatem sequi odit quos, laboriosam et
        facilis soluta amet ratione voluptates ipsam. Amet vel delectus, quis voluptate commodi quam
        quasi enim? Voluptate rerum sit officia deleniti reiciendis iusto minus suscipit esse natus
        Quibusdam voluptate eum laborum.
      </p>
      <section className={styles['video-container']}>
        {videoresources.map((resource) => {
          return (
            <iframe
              key={resource.id}
              className={styles['single-video']}
              src={resource.path}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          )
        })}
      </section>

      {/* Blogs section */}
      <h1 className={styles['section-heading']}>Blogs Section</h1>
      <p className={styles['section-description']}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam totam corrupti impedit
        nemo minus asperiores cumque saepe fuga. Quibusdam voluptate eum laborum debitis veniam
        repellendus asperiores commodi est corrupti voluptatem sequi odit quos, laboriosam et
        facilis soluta amet ratione voluptates ipsam. Amet vel delectus, quis voluptate commodi quam
        quasi enim? Voluptate rerum sit officia deleniti reiciendis iusto minus suscipit esse natus
        Quibusdam voluptate eum laborum.
      </p>
      <section></section>
      <div className={styles['resource-items-container']}>
        {blogresources.map((resource) => {
          return (
            <div key={resource.id} className={styles['resource-container']}>
              <div className={styles['resource-image-container']}>
                <img src={resource.image} alt="" />
              </div>
              <div className={styles['resource-text-container']}>
                <h1>{resource.name}</h1>
                <p>{resource.desc}</p>
                <a href={resource.path} target="_blank" rel="noreferrer">
                  <button>Read More</button>
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default resource
