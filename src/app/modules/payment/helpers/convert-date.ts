import { FlatpickrOptions} from "ng2-flatpickr"

export function convert(str: string) {
  const date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2)
  return [date.getFullYear(), mnth, day].join("-")
}

