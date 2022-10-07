import CatalogItem from "./CatalogItem";

export default function CatalogFooter({ catalogData }) {
  const { catalogFooter } = catalogData

  return (
    <div className="def-padding grid grid-cols-3 gap-12 mb-40">
      {catalogFooter.map((item, index) => (
        <CatalogItem item={item} key={index} />
      ))}
    </div>
  )
}