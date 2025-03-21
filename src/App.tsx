import React, { useState } from 'react'
import { CustomerForm } from './components/CustomerForm'
import { CustomerList } from './components/CustomerList'
import { Customer, CustomerFormData } from './types/customer'
import { WebApp } from './utils/telegram'

const App: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [isFormVisible, setIsFormVisible] = useState(true)
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null)

  const handleSubmit = (formData: CustomerFormData) => {
    if (editingCustomer) {
      // 更新现有客户
      const updatedCustomers = customers.map(customer =>
        customer.id === editingCustomer.id
          ? { ...customer, ...formData }
          : customer
      )
      setCustomers(updatedCustomers)
      setEditingCustomer(null)
    } else {
      // 添加新客户
      const newCustomer: Customer = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString()
      }
      setCustomers([...customers, newCustomer])
    }
    setIsFormVisible(false)
    WebApp.close()
  }

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer)
    setIsFormVisible(true)
  }

  const handleDelete = (customer: Customer) => {
    const updatedCustomers = customers.filter(c => c.id !== customer.id)
    setCustomers(updatedCustomers)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {isFormVisible ? (
        <CustomerForm
          onSubmit={handleSubmit}
          initialData={editingCustomer || undefined}
        />
      ) : (
        <CustomerList
          customers={customers}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}

export default App 