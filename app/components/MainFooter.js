import Link from 'next/link'
import CopyPasteLink from './CopyPasteLink'
// import EmailSignup from './EmailSignup'

export default function MainFooter({ infoData, currentTheme }) {
  const links = infoData.contactlinks.filter((link) => link.showInFooter)

  return (
    <footer className="p-def-half">
      <div className="bg-grey-1 flex flex-wrap lg:flex-nowrap p-def-half">
        <div className="w-full lg:w-1/3 flex flex-wrap">
          {links.map((item, index) => (
            <div
              className="text-base text-left w-full lg:w-1/2 mb-8"
              key={index}
            >
              <p>{item.title}</p>
              {item.link.includes('mailto') ? (
                <CopyPasteLink link={item} />
              ) : (
                <Link href={item.link}>
                  <a
                    className="fade text-left"
                    target="_blank"
                  >
                    {item.linkText}
                  </a>
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="w-full lg:w-1/3 mb-8 lg:mb-0 text-base">
          <p>Newsletter:</p>
          <Link href="https://furniturexyz.substack.com/subscribe?params=%5Bobject%20Object%5D">
            <a
              className="fade text-left"
              target="_blank"
            >
              Subscribe
            </a>
          </Link>
          {/* <div className="email">
            <EmailSignup currentTheme={currentTheme} />
          </div> */}
        </div>

        <div className="w-full lg:w-1/3 flex justify-start lg:justify-end pb-12 lg:pb-0">
          <div className="lg:pr-16">
            <p className="text-base text-grey-dark">©{new Date().getFullYear()}</p>
            <p className="text-base text-grey-dark">All right reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
