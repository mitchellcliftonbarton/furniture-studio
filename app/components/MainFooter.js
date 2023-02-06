import Link from "next/link";
import CopyPasteLink from "./CopyPasteLink";
import EmailSignup from "./EmailSignup";

export default function MainFooter({ infoData, currentTheme }) {
  const links = infoData.contactlinks.filter(link => link.showInFooter)

  return (
    <footer className="def-padding flex flex-wrap lg:flex-nowrap">
      <div className="w-full lg:w-1/3 flex flex-wrap">
        {links.map((item, index) => (
          <div className="text-base text-left w-full lg:w-1/2 mb-8" key={index}>
            <p>{item.title}</p>
            {item.link.includes('mailto')
              ? <CopyPasteLink link={item} />
              : <Link href={item.link}>
                  <a className="fade text-left">
                    {item.linkText}
                  </a>
                </Link>
            }
          </div>
        ))}
      </div>

      <div className="w-full lg:w-1/3 mb-8 lg:mb-0">
        <h3 className="text-base mb-2">Newsletter</h3>
        <div className="email">
          <EmailSignup currentTheme={currentTheme} />
        </div>
      </div>

      <div className="w-full lg:w-1/3 flex justify-start lg:justify-end pb-12 lg:pb-0">
        <div className="lg:pr-16">
          <p className="text-base text-grey-dark">©{ new Date().getFullYear() }</p>
          <p className="text-base text-grey-dark">All right reserved.</p>
        </div>
      </div>
    </footer>
  )
}