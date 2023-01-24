import Link from "next/link";
import CopyPasteLink from "./CopyPasteLink";

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
        <div id="mc_embed_signup">
          <form 
            action="https://xyz.us13.list-manage.com/subscribe/post?u=c4e5f18b25aabd1903cd82d40&amp;id=e06a987820&amp;f_id=00b1dee2f0"
            method="post" 
            id="mc-embedded-subscribe-form" 
            name="mc-embedded-subscribe-form" 
            className="validate" 
            target="_self"
          >
            <div id="mc_embed_signup_scroll" className="flex">
              <div className="email-field mc-field-group flex-1 w-full">
                <label htmlFor="mce-EMAIL" className="hidden">Email Address  <span className="asterisk">*</span></label>
                <input type="email" defaultValue="" name="EMAIL" className={`${currentTheme === 2 ? 'text-center' : 'text-left'} required email text-base text-grey-dark w-full py-4 px-6`} id="mce-EMAIL" required placeholder="Email address"/>
                <span id="mce-EMAIL-HELPERTEXT" className="helper_text"></span>
              </div>

              <div id="mce-responses" className="clear foot">
                <div className="response" id="mce-error-response" style={{ display: 'none' }}></div>
                <div className="response" id="mce-success-response" style={{ display: 'none' }}></div>
              </div>

              <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                <input type="text" name="b_c4e5f18b25aabd1903cd82d40_e06a987820" tabIndex="-1" defaultValue="" />
              </div>

              <div className="optionalParent flex-0-0 ml-10">
                <div className="clear foot">
                  <button type="submit" className="text-base py-4 px-6">Submit</button>
                </div>
              </div>
            </div>
        </form>
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