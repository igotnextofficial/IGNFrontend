
const forms = {
    login:{
        fields:{
            email:{
                props:
                {
                    required:true,
                    fullWidth:true,
                    type:'text',
                    label:'Email Address',
                    name:'email',
                    id:'email',
                    variant:'filled',
                    margin:'normal'
                },
                order: 1
            },
            password:{
                props:
                {
                    required:true,
                    fullWidth:true,
                    name:'password',
                    label:'password',
                    type:'password',
                    id:'password',
                    autoComplete:'current-password',
                    variant:'filled',
                    margin: 'normal'
                },
                order:2
            },
            checkbox:{
                props:
                {
                    name:'remember',
                    label:'Remember me',
                    type:'checkbox',
                },
                order:3
            },
          
        },
        defaults:{
            email:'',
            password:'',
            remember:false

        }
    },
    register:{}
}

export default forms;