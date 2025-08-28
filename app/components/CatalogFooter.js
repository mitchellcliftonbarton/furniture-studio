import CatalogItem from './CatalogItem'

export default function CatalogFooter({ catalogData, allFonts }) {
  const { catalogFooter } = catalogData

  // console.log(allFonts)

  return (
    <div className="px-def-half">
      <div className="bg-grey-1 grid grid-cols-3 gap-12 px-def-half py-def rounded-2xl">
        {catalogFooter.map((item, index) => (
          <CatalogItem
            item={item}
            key={index}
            allFonts={allFonts}
          />
        ))}
      </div>
    </div>
  )
}
