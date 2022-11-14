import CatalogItem from "./CatalogItem";

export default function CatalogFooter({ catalogData, allFonts }) {
  const { catalogFooter } = catalogData

  // console.log(allFonts)

  return (
    <div className="def-x grid grid-cols-3 gap-12 mb-40">
      {catalogFooter.map((item, index) => (
        <CatalogItem item={item} key={index} allFonts={allFonts} />
      ))}
    </div>
  )
}