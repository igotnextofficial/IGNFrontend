import React, {useEffect, useState} from 'react'
import { UserDataType,ProductDataType } from "../../../types/DataTypes";
import { Link } from 'react-router-dom'; 

export default function ProductDisplay({user,displayButton}:{user:UserDataType,displayButton:boolean}){
    const [products, setProducts] = useState<ProductDataType[]>([]);

    useEffect(() => {
        if(!user){return}
       const products:ProductDataType[] = Array.isArray(user.product)
        ? user.product
        : user.product != null
        ? [user.product]
        : [];
        setProducts(products)
    },[user.product])

    useEffect(() => {
        console.log(`the products`)
        console.log(products)
    },[products])
    return (
        <>
         {products.length === 0 &&  (
             <p className="muted">No  current products</p>
         )}

         {
            products.map(product => {
                 return (
                    <div className="card pricing-card" key={product.name}>
                    <div className="pricing-title">Core Session</div>  
                    <div className="pricing-price">{product.formatted_price}</div>
                    <p className="pricing-desc">60‑min 1:1 coaching + action plan.</p>
                   { displayButton && <Link to={`/mentors/book-a-mentor/${user.id}`}>
                    <button className="btn-primary w-full">Select</button>
                    </Link>}
                  </div>
                  )
            })
         }
        </>
    )
}

{/* <div className="pricing-grid">
                {[
                  {
                    title: "Intro",
                    price: "$150",
                    desc: "30‑min chemistry check & quick tips.",
                  },
                  {
                    title: "Core Session",
                    price: "$300",
                    desc: "60‑min 1:1 coaching + action plan.",
                  },
                  {
                    title: "Pro Track",
                    price: "$1,500",
                    desc: "6‑session package + audition prep.",
                  },
                ].map((p) => (
                  <div className="card pricing-card" key={p.title}>
                    <div className="pricing-title">{p.title}</div>
                    <div className="pricing-price">{p.price}</div>
                    <p className="pricing-desc">{p.desc}</p>
                    <button className="btn-primary w-full">Select</button>
                  </div>
                ))}
              </div> */}