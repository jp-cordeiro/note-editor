Vue.filter('date', time => moment(time).format('DD/MM/YY, HH:mm'))

new Vue({
    el: '#app',
    data(){
        return{
            notes: JSON.parse(localStorage.getItem('notes')) || [],
            selectedId: localStorage.getItem('selected-id') || null
        }
    },
    computed:{
        notePreview(){
            return this.selectedNote ? marked(this.selectedNote.content) : ''
        },
        addButtonTitle(){
            return `${this.notes.length} anotação(ões) existente(s)`
        },
        selectedNote(){
            return this.notes.find(note => note.id === this.selectedId)
        },
        sortedNotes(){
            return this.notes.slice()
                .sort((a,b) => a.created - b.created)
                .sort((a,b) => (a.favorite === b.favorite) ? 0
                : a.favorite ? -1
                : 1)
        },
        linesCount(){
            if(this.selectedNote){
                //Conta o número de linhas
                return this.selectedNote.content.split(/\r\n|\r|\n/).length
            }
        },
        wordsCount(){
            if(this.selectedNote){
                var s = this.selectedNote.content
                //Transforma quebra de linhas em espaços em branco
                s = s.replace(/\n/g,' ')
                //Exclui espacos iniciais e finas (trim)
                s = s.replace(/(^\s*) | (\s*$)/gi,'')
                //Tranforma 2 ou mais espaços em branco em 1
                s = s.replace(/\s\s+/gi,' ')
                //Retorna o número de espaços
                return s.split(' ').length
            }
        },
        charactersCount(){
            if(this.selectedNote){
                return this.selectedNote.content.split('').length
            }
        }
    },
    methods:{
        addNote(){
            const time = Date.now()

            const note = {
                id: String(time),
                title: `Nova anotação ${this.notes.length + 1}`,
                content: '**Olá!** Essa anotação usa [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) em sua formatação!',
                created: time,
                favorite: false
            }

            this.notes.push(note)


        },
        reportOperation(opName){
            console.log('A operação:',opName,' foi concluída com sucesso.')
        },
        selectNote(note){
            this.selectedId = note.id
        },
        saveNotes(){
            localStorage.setItem('notes',JSON.stringify(this.notes))
        },
        removeNote(){
            if(this.selectedNote && confirm('Excluir a anotação?')){
                const index = this.notes.indexOf(this.selectedNote)
                if(index !== -1){
                    this.notes.splice(index,1)
                }
            }
        },
        favoriteNote(){
            this.selectedNote.favorite ^= true
            console.log(this.selectedNote)
        }
    },
    watch:{
        notes: {
            handler: 'saveNotes',
            deep: true
        },
        selectedId(val){
            localStorage.setItem('selected-id', val)
        }
    }
})