import React, { useCallback, useMemo, useState } from 'react'

export function useForm<TForm>(
  defaultValueFn: () => TForm
): [TForm, React.Dispatch<React.SetStateAction<TForm>>, (field: keyof TForm, value: any) => void] {
  const [formData, setFormData] = useState(defaultValueFn)

  const mergeFieldValue = useCallback((field: keyof TForm, value: any) => {
    setFormData(rawData => ({ ...rawData, [field]: value }))
  }, [])

  return useMemo(() => [formData, setFormData, mergeFieldValue], [formData, mergeFieldValue])
}
