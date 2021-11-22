import { useEffect, useState } from 'react';



const useForm = (defaultValues = {}, sideEffect = null) => {

  const [formData, setFormData] = useState(defaultValues);

  useEffect(() => {
    sideEffect && sideEffect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData])

  const updateForm = key => event => {
    setFormData({
      ...formData,
      [key]: event.target.value
    })
  }

  const resetForm = () => setFormData(defaultValues);

  return { updateForm, resetForm, formData };

}

export default useForm;