import { ColorValue } from "react-native"

export type NoteType = {
    id: number,
    title: string | undefined,
    description: string | undefined,
    noteDesign: {
        backgroundColor: ColorValue,
        textColor: ColorValue,
    },
    noteTextureId: number | null,
}
