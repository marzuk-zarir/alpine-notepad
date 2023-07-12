import { v4 as uuid } from 'uuid'

interface Note {
    id: string
    content: string
}

export function main() {
    const { Alpine } = window

    Alpine.data('notepad', function () {
        return {
            note: { id: uuid(), content: '' },
            notes: this.$persist([]),
            wordsCount: 0,
            charsCount: 0,
            isCopied: false,

            init() {
                this.$watch('note.content', () => {
                    const content = this.note.content.trim()
                    const note = this.notes.find((note: Note) => note.id === this.note.id)

                    if (note) {
                        const updateIndex = this.notes.indexOf(note)
                        this.notes[updateIndex] = this.note
                    } else {
                        if (content.length > 0 && this.notes.length === 20) {
                            this.notes.shift()
                        }

                        this.notes.push(this.note)
                    }

                    if (content.length === 0) {
                        const deleteIndex = this.notes.indexOf(this.note)
                        this.notes.splice(deleteIndex, 1)
                    }

                    this.wordsCount = content.length > 0 ? content.split(' ').length : 0
                    this.charsCount = content.length
                })
            },

            handleCreateNote() {
                this.note = { id: uuid(), content: '' }
            },

            handleSelectNote(id: string) {
                const note = this.$data.notes.find((note: Note) => note.id === id)

                if (note) {
                    this.$data.note = note
                }
            },

            async handleCopyNote() {
                try {
                    await navigator.clipboard.writeText(this.note.content)
                } catch (error) {
                    console.error(error)
                } finally {
                    this.isCopied = true

                    setTimeout(() => {
                        this.isCopied = false
                    }, 1000)
                }
            },

            handleDeleteNote(id: string) {
                const note = this.$data.notes.find((note: Note) => note.id === id)

                if (note) {
                    const deleteIndex = this.notes.indexOf(note)
                    this.notes.splice(deleteIndex, 1)
                }
            }
        }
    })
}
