// import React, { useEffect, useState } from 'react'

// const Content = () => {
//     const [formData, setFormData] = useState({
//         name: " ",
//         email: " ",
//         mobile: " ",
//     });

//     useEffect(() => {
//         const savedData = localStorage.getItem("userFormData");

//         if(savedData){
//            setFormData(JSON.parse(savedData)); 
//         };
//     });

//     const handleChange = (e) =>{
//         const {name, value} = e.target;

//         setFormData((prev) => ({
//             ...prev,
//             [name]:value,
//         }));   
//     };

//     const handleSubmit = (e) =>{
//         e.preventDefault();

//         localStorage.setItem("userFormData", JSON.stringify(formData));

//         alert("Data Saved Successfully");
//     }

//     return (

//         <div className='mx-auto max-w-xl p-8'>
//         <h2 className='rounded-xl mb-6 text-2xl font-bold text-slate-900'>
//             User Form
//         </h2>
        
//         <form 
//         onSubmit={handleSubmit}
//         className='bg-white space-y-4 rounded-xl px-4 py-4 border border-slate-200 '>

//             <div className=''>
//                 <label className='mb-1 '>
//                     Name
//                 </label>

//                 <input 
//                 type='text'
//                 name='Name'
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="Enter your name here"
//                 className='rounded-lg w-full border border-slate-300 outline-none px-4 py-1.5  focus:border-blue-500 '
//                 />
//             </div>

//             <div>
//                 <label className='mb-1'>
//                     Email
//                 </label>

//                 <input 
//                     type='email'
//                     name='email'
//                     value={formData.email}
//                     placeholder="Enter your email here"
//                     className='w-full px-4 py-1.5 border border-slate-300 rounded-lg outline-none focus:border-blue-500'
//                 />
//             </div>

//             <div className=''>
//             <label className='mb-1'>
//                 Mobile.No
//             </label>

//             <input 
//             type='text'
//             name='mobile'
//             value={formData.mobile}
//             placeholder="Enter your mobile no here"
//             className='w-full rounded-lg px-4 py-1.5 border border-slate-300 outline-none focus:border-blue-500'
//             />
//             </div>
//         </form>

//         </div>
//     )
// }

// export default Content



// import React from 'react'

// const Content = () => {
//     const flightData = [
//   {
//     id: 1,
//     airline: "IndiGo",
//     flightNumber: "6E 2145",
//     aircraft: "Airbus A320",
//     logo: "6E",
//     from: "DEL",
//     fromCity: "New Delhi",
//     departure: "06:15",
//     to: "BOM",
//     toCity: "Mumbai",
//     arrival: "08:25",
//     duration: "2h 10m",
//     stops: "Non-stop",
//     stopCount: 0,
//     price: 4899,
//     oldPrice: 5599,
//     baggage: "15 kg",
//     cabin: "7 kg",
//     meal: "Paid",
//     wifi: false,
//     rating: 4.4,
//     recommended: true,
//     cancellation: "Free cancellation",
//   },
//   {
//     id: 2,
//     airline: "Air India",
//     flightNumber: "AI 865",
//     aircraft: "Airbus A320neo",
//     logo: "AI",
//     from: "DEL",
//     fromCity: "New Delhi",
//     departure: "08:40",
//     to: "BOM",
//     toCity: "Mumbai",
//     arrival: "10:55",
//     duration: "2h 15m",
//     stops: "Non-stop",
//     stopCount: 0,
//     price: 5299,
//     oldPrice: 6199,
//     baggage: "20 kg",
//     cabin: "7 kg",
//     meal: "Included",
//     wifi: true,
//     rating: 4.2,
//     recommended: false,
//     cancellation: "Free cancellation",
//   },
//   {
//     id: 3,
//     airline: "Akasa Air",
//     flightNumber: "QP 1123",
//     aircraft: "Boeing 737 MAX",
//     logo: "QP",
//     from: "DEL",
//     fromCity: "New Delhi",
//     departure: "11:30",
//     to: "BOM",
//     toCity: "Mumbai",
//     arrival: "13:45",
//     duration: "2h 15m",
//     stops: "Non-stop",
//     stopCount: 0,
//     price: 4499,
//     oldPrice: 5199,
//     baggage: "15 kg",
//     cabin: "7 kg",
//     meal: "Paid",
//     wifi: false,
//     rating: 4.3,
//     recommended: false,
//     cancellation: "Limited cancellation",
//   },
//   {
//     id: 4,
//     airline: "Vistara",
//     flightNumber: "UK 955",
//     aircraft: "Airbus A321",
//     logo: "UK",
//     from: "DEL",
//     fromCity: "New Delhi",
//     departure: "15:10",
//     to: "BOM",
//     toCity: "Mumbai",
//     arrival: "17:25",
//     duration: "2h 15m",
//     stops: "Non-stop",
//     stopCount: 0,
//     price: 5799,
//     oldPrice: 6599,
//     baggage: "20 kg",
//     cabin: "7 kg",
//     meal: "Included",
//     wifi: true,
//     rating: 4.6,
//     recommended: true,
//     cancellation: "Free cancellation",
//   },
//   {
//     id: 5,
//     airline: "IndiGo",
//     flightNumber: "6E 5338",
//     aircraft: "Airbus A321",
//     logo: "6E",
//     from: "DEL",
//     fromCity: "New Delhi",
//     departure: "19:25",
//     to: "BOM",
//     toCity: "Mumbai",
//     arrival: "21:40",
//     duration: "2h 15m",
//     stops: "Non-stop",
//     stopCount: 0,
//     price: 5099,
//     oldPrice: 5899,
//     baggage: "15 kg",
//     cabin: "7 kg",
//     meal: "Paid",
//     wifi: false,
//     rating: 4.4,
//     recommended: false,
//     cancellation: "Free cancellation",
//   },
// ];

//   return (

    

//        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
//       {flightData.map((flight) => (
//         <div key={flight.id} className="border rounded-xl p-4">
//           <h2>{flight.airline}</h2>
//           <p>{flight.flightNumber}</p>
//           <p>{flight.from} → {flight.to}</p>
//           <p>{flight.departure} - {flight.arrival}</p>
//           <p>{flight.duration}</p>
//           <p>₹{flight.price}</p>
//           <p>₹{flight.oldPrice}</p>
//           <p>{flight.baggage}</p>
//           <p>{flight.cabin}</p>
//           <p>{flight.meal}</p>
//           <p>{flight.wifi}</p>
//           <p>{flight.rating}</p>
//           <p>{flight.recommended}</p>
//           <p>{flight.cancellation}</p>
//         </div>
//       ))}
//     </div>

    
//   )
// }

// export default Content


import React, { useEffect, useState } from 'react'

const Content = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        address: '',
        pincode:'',
    })

    useEffect(() => {
        const savedData = localStorage.getItem('userFormData')

        if (savedData) {
            setFormData(JSON.parse(savedData))
        }
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        localStorage.setItem('userFormData', JSON.stringify(formData))
        alert('Data Saved Successfully')
    }

  return (
    <div  className='mx-auto rounded-xl max-w-lg px-2'>
        <h1 className='rounded-xl font-bold text-2xl mb-8'>User Form</h1>

        <form onSubmit={handleSubmit} className='px-4 py-4 bg-white rounde-xl'>
           <div className=''>
             <label className='flex mb-1'>
                Name:
            </label>
            <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder='Enter Your Name Here'
            className='rounded-xl px-4 py-1.5 border bg-slate-200 w-full border-slate-300 outline-none focus:border-blue-600'
            />
           </div>

           <div className='pt-4'>
            <label className='flex mb-1'>
                Email:
            </label>
            <input 
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Enter Your email here'
                className='rounded-xl px-4 py-1.5 border bg-slate-200 w-full border-slate-200 outline-none focus:border-blue-600' 
            />
           </div>
          <div className='flex flex-cols gap-2'>
             <div className='pt-4'>
            <label className='flex mb-1'>
                Phone.No:
            </label>
            <input 
                type='text'
                name='mobile'
                value={formData.mobile}
                onChange={handleChange}
                placeholder='Enter your mobile no. here'
                className='rounded-xl px-4 bg-slate-200 py-1.5 border w-full border-slate-200 outline-none focus:border-blue-600'
            />
           </div>
           <div className='pt-4'>
            <label className='flex mb-1'>
                Alternate No:
            </label>
            <input 
                type='text'
                placeholder='Enter you alternate mobile no here'
                className='rounded-xl w-full px-4 py-1.5 bg-slate-200 border border-slate-200 outline-none
                focus:border-blue-600'
            />
           </div>
          </div>
           <div className='pt-4'>
            <label className='flex mb-1'>
                Address
            </label>
            <input 
                type='text'
                name='address'
                value={formData.address}
                onChange={handleChange}
                placeholder='Enter your address here'
                className='rounded-xl px-4 py-1.5 w-full border boreder-slate-200 bg-slate-200 outline-none focus:border-blue-600'

            />
           </div>

           <div className='pt-4'>
            <labe className="mb-1">
                Pin Code:
            </labe>
            <input 
                type='text'
                placeholder='Enter your pin code here...'
                className='w-full bg-slate-200 rounded-xl px-4 py-1.5 border border-slate-200 outline-none
                 focus:border-blue-600'
            />
           </div>
          <div className='pt-4'>
             <button className='px-4 py-2 rounded-2xl bg-blue-600 text-md font-semibold flex items-center text-center
           w-full justify-center '>
            Submit Now
           </button>
          </div>
        </form>
    </div>
  )
}

export default Content