import { ColorValue } from "react-native"

export type NoteType = {
    id: number,
    title: string | undefined,
    description: string | undefined,
    noteDesign: {
        backgroundColor: ColorValue | undefined,
        textColor: ColorValue | string,
    },
    noteTextureId: number | null,
    fontSize: {
        name: string,
        size: number,
    },
}
