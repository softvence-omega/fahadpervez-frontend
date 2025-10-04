"use client"

import { useState } from "react"
import { Dialog } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { AnimatePresence, motion } from "framer-motion"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import master from "@/assets/dashboard/master.svg"
import visa from "@/assets/dashboard/visa.svg"
import web from "@/assets/dashboard/web.svg"

const gateways = [
  {
    id: "mastercard",
    name: "Mastercard",
    img: master,
  },
  {
    id: "visa",
    name: "Visa Card",
    img: visa,
  },
  {
    id: "webpay",
    name: "Web Pay",
    img: web,
  },
]

interface PaymentSettingsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const PaymentSettingsDialog = ({ open, onOpenChange }: PaymentSettingsDialogProps) => {
  const [selectedGateway, setSelectedGateway] = useState("mastercard")
  const [formData, setFormData] = useState({
    cardNumber: "",
    country: "",
    expiryDate: "",
    cvc: "",
    zip: "",
  })

  const activeGateway = gateways.find((gw) => gw.id === selectedGateway)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", { gateway: selectedGateway, ...formData })
    // Add your API call or logic here
    onOpenChange(false)
    // Reset form after submission
    setFormData({
      cardNumber: "",
      country: "",
      expiryDate: "",
      cvc: "",
      zip: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <DialogPrimitive.Portal forceMount>
            {/* Animated Overlay */}
            <DialogPrimitive.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              />
            </DialogPrimitive.Overlay>

            {/* Animated Content */}
            <DialogPrimitive.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{
                  duration: 0.2,
                  ease: [0.16, 1, 0.3, 1], // Custom easing for smooth motion
                }}
                className="fixed left-[50%] top-[50%] z-50 w-full max-w-[95vw] sm:max-w-[600px] translate-x-[-50%] translate-y-[-50%] bg-white rounded-lg shadow-lg max-h-[90vh] overflow-y-auto"
              >
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6 p-6">
                    {/* Header */}
                    <div className="space-y-2">
                      <h2 className="text-xl font-semibold text-gray-800">
                        Add Payment Methods
                      </h2>
                    </div>

                    {/* Gateway Selection */}
                    <div className="space-y-3">
                      <Label className="text-sm font-normal text-gray-700">
                        Choose Your Payment Gateway:
                      </Label>
                      <div className="flex flex-wrap items-center gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
                        {gateways.map((gw) => (
                          <div key={gw.id} className="flex items-center gap-2">
                            <Checkbox
                              id={gw.id}
                              checked={selectedGateway === gw.id}
                              onCheckedChange={() => setSelectedGateway(gw.id)}
                              className={
                                selectedGateway === gw.id
                                  ? "bg-black text-white border-black"
                                  : ""
                              }
                            />
                            <img src={gw.img} alt={gw.name} className="h-6 w-auto" />
                            <Label
                              htmlFor={gw.id}
                              className="cursor-pointer text-sm font-normal text-gray-700"
                            >
                              {gw.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Card Form */}
                    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-6">
                      {/* Card Logo */}
                      <div className="mb-4">
                        {activeGateway && (
                          <img
                            src={activeGateway.img}
                            alt={activeGateway.name}
                            className="h-8 w-auto"
                          />
                        )}
                      </div>

                      {/* Card Number */}
                      <div className="space-y-2">
                        <Label
                          htmlFor="card-number"
                          className="text-sm font-normal text-gray-700"
                        >
                          Card Number:
                        </Label>
                        <Input
                          id="card-number"
                          placeholder="01234 5678 9100"
                          value={formData.cardNumber}
                          onChange={(e) =>
                            setFormData({ ...formData, cardNumber: e.target.value })
                          }
                          className="border-gray-300"
                          required
                        />
                      </div>

                      {/* Country and Expiry Date */}
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label
                            htmlFor="country"
                            className="text-sm font-normal text-gray-700"
                          >
                            Country:
                          </Label>
                          <Input
                            id="country"
                            placeholder="United States"
                            value={formData.country}
                            onChange={(e) =>
                              setFormData({ ...formData, country: e.target.value })
                            }
                            className="border-gray-300"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="expiry"
                            className="text-sm font-normal text-gray-700"
                          >
                            Expiry Date:
                          </Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={(e) =>
                              setFormData({ ...formData, expiryDate: e.target.value })
                            }
                            className="border-gray-300"
                            maxLength={5}
                            required
                          />
                        </div>
                      </div>

                      {/* CVC and ZIP */}
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label
                            htmlFor="cvc"
                            className="text-sm font-normal text-gray-700"
                          >
                            CVC:
                          </Label>
                          <Input
                            id="cvc"
                            placeholder="123"
                            value={formData.cvc}
                            onChange={(e) =>
                              setFormData({ ...formData, cvc: e.target.value })
                            }
                            maxLength={4}
                            className="border-gray-300"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="zip"
                            className="text-sm font-normal text-gray-700"
                          >
                            ZIP:
                          </Label>
                          <Input
                            id="zip"
                            placeholder="12345"
                            value={formData.zip}
                            onChange={(e) =>
                              setFormData({ ...formData, zip: e.target.value })
                            }
                            className="border-gray-300"
                            required
                          />
                        </div>
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        className="w-auto bg-blue-600 hover:bg-blue-700 px-8"
                      >
                        Add Card
                      </Button>
                    </div>
                  </div>
                </form>

                {/* Close Button */}
                <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </DialogPrimitive.Close>
              </motion.div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </Dialog>
  )
}

export default PaymentSettingsDialog;





// "use client"

// import { useState } from "react"
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox"

// import master from "@/assets/dashboard/master.svg"
// import visa from "@/assets/dashboard/visa.svg"
// import web from "@/assets/dashboard/web.svg"

// const gateways = [
//   {
//     id: "mastercard",
//     name: "Mastercard",
//     img: master,
//   },
//   {
//     id: "visa",
//     name: "Visa Card",
//     img: visa,
//   },
//   {
//     id: "webpay",
//     name: "Web Pay",
//     img: web,
//   },
// ]

// interface PaymentSettingsDialogProps {
//   open: boolean
//   onOpenChange: (open: boolean) => void
// }

// const PaymentSettingsDialog = ({ open, onOpenChange }: PaymentSettingsDialogProps) => {
//   const [selectedGateway, setSelectedGateway] = useState("mastercard")
//   const [formData, setFormData] = useState({
//     cardNumber: "",
//     country: "",
//     expiryDate: "",
//     cvc: "",
//     zip: "",
//   })

//   const activeGateway = gateways.find((gw) => gw.id === selectedGateway)

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     console.log("Form submitted:", { gateway: selectedGateway, ...formData })
//     onOpenChange(false)
//   }

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
//         <form onSubmit={handleSubmit}>
//           <div className="space-y-6">
//             <DialogHeader>
//               <DialogTitle className="text-xl font-semibold text-gray-800">
//                 Add Payment Methods
//               </DialogTitle>
//             </DialogHeader>

//             {/* Gateway Selection */}
//             <div className="space-y-3">
//               <Label className="text-sm font-normal text-gray-700">
//                 Choose Your Payment Gateway:
//               </Label>
//               <div className="flex flex-wrap items-center gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
//                 {gateways.map((gw) => (
//                   <div key={gw.id} className="flex items-center gap-2">
//                     <Checkbox
//                       id={gw.id}
//                       checked={selectedGateway === gw.id}
//                       onCheckedChange={() => setSelectedGateway(gw.id)}
//                       className={selectedGateway === gw.id ? "bg-black text-white" : ""}
//                     />
//                     <img
//                       src={gw.img}
//                       alt={gw.name}
//                       className="h-6 w-auto"
//                     />
//                     <Label
//                       htmlFor={gw.id}
//                       className="cursor-pointer text-sm font-normal text-gray-700"
//                     >
//                       {gw.name}
//                     </Label>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Card Form */}
//             <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-6">
//               {/* Card Logo */}
//               <div className="mb-4">
//                 {activeGateway && (
//                   <img
//                     src={activeGateway.img}
//                     alt={activeGateway.name}
//                     className="h-8 w-auto"
//                   />
//                 )}
//               </div>

//               {/* Card Number */}
//               <div className="space-y-2">
//                 <Label htmlFor="card-number" className="text-sm font-normal text-gray-700">
//                   Card Number:
//                 </Label>
//                 <Input
//                   id="card-number"
//                   placeholder="01234 5678 9100"
//                   value={formData.cardNumber}
//                   onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
//                   className="border-gray-300"
//                   required
//                 />
//               </div>

//               {/* Country and Expiry Date */}
//               <div className="grid gap-4 sm:grid-cols-2">
//                 <div className="space-y-2">
//                   <Label htmlFor="country" className="text-sm font-normal text-gray-700">
//                     Country:
//                   </Label>
//                   <Input
//                     id="country"
//                     placeholder="United States"
//                     value={formData.country}
//                     onChange={(e) => setFormData({ ...formData, country: e.target.value })}
//                     className="border-gray-300"
//                     required
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="expiry" className="text-sm font-normal text-gray-700">
//                     Expiry Date:
//                   </Label>
//                   <Input
//                     id="expiry"
//                     placeholder="MM/YY"
//                     value={formData.expiryDate}
//                     onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
//                     className="border-gray-300"
//                     maxLength={5}
//                     required
//                   />
//                 </div>
//               </div>

//               {/* CVC and ZIP */}
//               <div className="grid gap-4 sm:grid-cols-2">
//                 <div className="space-y-2">
//                   <Label htmlFor="cvc" className="text-sm font-normal text-gray-700">
//                     CVC:
//                   </Label>
//                   <Input
//                     id="cvc"
//                     placeholder="123"
//                     value={formData.cvc}
//                     onChange={(e) => setFormData({ ...formData, cvc: e.target.value })}
//                     maxLength={4}
//                     className="border-gray-300"
//                     required
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="zip" className="text-sm font-normal text-gray-700">
//                     ZIP:
//                   </Label>
//                   <Input
//                     id="zip"
//                     placeholder="12345"
//                     value={formData.zip}
//                     onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
//                     className="border-gray-300"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <Button type="submit" className="w-auto bg-blue-600 hover:bg-blue-700 px-8">
//                 Add Card
//               </Button>
//             </div>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }

// export default PaymentSettingsDialog
