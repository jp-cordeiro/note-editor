new Vue({
    el: '#app',
    data(){
        return{
            content: this.content = localStorage.getItem('content') || 'Escreva uma **anotação**',
            notes: [],
            selectedId: null
        }
    },
    computed:{
        notePreview(){
            return marked(this.content)
        },
        addButtonTitle(){
            return `${this.notes.length} anotação(ões) existente(s)`
        }
    },
    methods:{
        addNote(){
            const time = Date.now()

            const note = {
                id: String(time),
                title: `Nova anotação ${this.notes.length + 1}`,
                content: '**Hi!** This notebook is using\n [markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet\n) for formatting!\'',
                created: time,
                favorite: false
            }

            this.notes.push(note)
        },
        saveNote(){
            localStorage.setItem('content',this.content)
        },
        reportOperation(opName){
            console.log('A operação:',opName,' foi concluída com sucesso.')
        }
    },
    watch:{
        content: 'saveNote'
    },
    created(){
        // this.content = localStorage.getItem('content') || 'Escreva uma **anotação**'
        this.notes = JSON.parse(localStorage.getItem('notes'))
    }
})