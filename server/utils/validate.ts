import {
    Schema,
    validate as joiValidate,
    ValidationOptions,
} from 'joi'

import get from 'lodash.get'

export const validate = <T>(input: T, schema: Schema, options?: ValidationOptions) => {
  
    const {error, value} = joiValidate(input, schema, {
      abortEarly: false,
      presence:   'required',
      ...options,
    })
  
    if (error) {
  
      const detailMessages = error.details
        .map(d => `${ d.message }\n${ d.path.join('.') }\nactual: ${ get(input, d.path) }`)
        .join('\n\n')
      throw new Error(`The following validation errors occurred:\n\n${ detailMessages }`)
  
    }
  
    return value
  
}
  