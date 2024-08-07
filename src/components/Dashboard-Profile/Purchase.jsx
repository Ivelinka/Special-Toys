import { memo, useEffect, useState } from "react";
import { useSessionContext } from "../Contact/useSessionStorage";
import { fetchTotalPurchaseCategory } from "../Helpers/ToyPromises";

export const PurchaseTemplate = () => {
    const[invis, setInvis] = useState(true)
    const [session, setSession] = useSessionContext()

    const[totalPurchaseBears, setTotalPurchaseBears] = useState("")
    const[totalPurchaseRainbow, setTotalPurchaseRainbow] = useState("")

    useEffect(() => {
      let userId = session.userId
  fetchTotalPurchaseCategory("CareBears", userId).then(setTotalPurchaseBears) 
  fetchTotalPurchaseCategory("RainbowBrite", userId).then(setTotalPurchaseRainbow)       
}, [session])

    return (
        <section id="user-purchase-page" className="user-profile">
<table id="purchase-table">
            <thead>
                  <tr>
                    <th>Bears</th>
                    <th>Purchase:</th>
                    <td><h4>{totalPurchaseBears} </h4></td>
                  </tr>
            </thead>
            <thead>
                  <tr>
                    <th>Rainbow</th>
                    <th>Purchase</th>
                    <td><h4>{totalPurchaseRainbow} </h4></td>
                  </tr>
            </thead>
            <thead>
            <tr>
              <th>Others</th>
              <th>Purchase</th>
              <td><h4> </h4></td>
            </tr>
      </thead>
        </table>
    
    </section>
    );
};
export default memo(PurchaseTemplate);