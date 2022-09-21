import { ColorValue } from "react-native"

export type NoteType = {
    id: number,
    title: string | undefined,
    description: string | undefined,
    color: ColorValue
}
