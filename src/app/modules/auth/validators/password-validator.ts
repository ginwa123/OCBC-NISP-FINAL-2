import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms"

export function passwordAtLeastOneNumber(controlName: "password"): ValidatorFn {
  return (controls: AbstractControl): { atLeastOneNumber: boolean } | null => {
    const control = controls.get(controlName)
    const hasNumeric = /[0-9]+/.test(control?.value)
    if (hasNumeric) {
      return null
    }
    controls.get(controlName)?.setErrors({ atLeastOneNumber: true })
    return { atLeastOneNumber: true }
  }
}

export function passwordAtLeastOneUppercase(controlName: "password"): ValidatorFn {
  return (controls: AbstractControl): { atLeastOneUpperCase: boolean } | null => {
    const control = controls.get(controlName)
    const hasUpperCase = /[A-Z]+/.test(control?.value)
    if (hasUpperCase) {
      return null
    }
    controls.get(controlName)?.setErrors({ atLeastOneUpperCase: true })
    return { atLeastOneUpperCase: true }
  }
}

export function passwordAtLeastOneLowercase(controlName: "password"): ValidatorFn {
  return (controls: AbstractControl): { atLeastOneLowerCase: boolean } | null => {
    const control = controls.get(controlName)
    const hasLowerCase = /[a-z]+/.test(control?.value)
    if (hasLowerCase) {
      return null
    }
    controls.get(controlName)?.setErrors({ atLeastOneLowerCase: true })
    return { atLeastOneLowerCase: true }
  }
  
}

export function passwordAtLeastOneNonAlphanumeric(controlName: "password"): ValidatorFn {
  return (controls: AbstractControl): { atLeastOneNon: boolean } | null => {
    const control = controls.get(controlName)
    const hasNonAlpha = /[^(a-z)(A-Z)(0-9)]+/.test(control?.value)
    if (hasNonAlpha) {
      return null
    }
    controls.get(controlName)?.setErrors({ atLeastOneNonAlphaNumeric: true })
    return { atLeastOneNon: true }
  }

}

export function passwordConfirmMatch(controlName: string, checkControlName: string): ValidatorFn {
  return (controls: AbstractControl): { mismatch: boolean } | null => {
    const control = controls.get(controlName)
    const checkControl = controls.get(checkControlName)
    if (control?.value !== checkControl?.value) {
      controls.get(checkControlName)?.setErrors({ mismatch: true })
      return { mismatch: true }
    }
    controls.get(checkControlName)?.setErrors(null)
    return null
  }
}
