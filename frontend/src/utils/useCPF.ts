'use client'
import { useState } from 'react'

export function useCPF(initialValue = '') {
  const [cpf, setCpf] = useState(formatCpf(initialValue))

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const rawValue = e.target.value.replace(/\D/g, '').slice(0, 11) 
    setCpf(formatCpf(rawValue))
  }

  function formatCpf(value: string) {
    return value
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')
  }

  return {
    cpf,
    handleChange,
    setCpf
  }
}

