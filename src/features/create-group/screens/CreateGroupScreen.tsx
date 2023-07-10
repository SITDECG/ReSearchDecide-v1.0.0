import React from 'react'
import { AuthenticatedLayout } from "../../../components/layout/AuthenticatedLayout";
import { CreateGroupForm, CreateGroupFormValues } from "../../../components/forms/CreateGroupForm";


export const CreateGroupScreen = () => {
  const handleSubmit = (values: CreateGroupFormValues) => {
    console.log('hola mundo');
  }

  return (
      <AuthenticatedLayout>
        <CreateGroupForm onSubmit={ handleSubmit } buttonText={ 'Create group' } isLoading={ true }/>
      </AuthenticatedLayout>
  )
}
