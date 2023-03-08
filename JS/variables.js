types={
    card:[
        {
            name:'',
            levels:[
                {effect:[0],attack:0,cost:0},
                {effect:[0],attack:0,cost:0},
            ],
        },{
            name:'Strike',
            levels:[
                {effect:[6],attack:1,cost:1},
                {effect:[9],attack:1,cost:1},
            ],
        },{
            name:'Defend',
            levels:[
                {effect:[8],attack:2,cost:1},
                {effect:[12],attack:2,cost:1},
            ],
        },{
            name:'Step',
            levels:[
                {effect:[1],attack:3,cost:1},
                {effect:[1],attack:3,cost:0},
            ],
        },
    ],combatant:[
        {life:0},
        {life:60},
    ],color:{
        card:[
            {
                fill:[200,200,200],
                stroke:[175,175,175],
                text:[50,50,50],
            },{
                fill:[150,200,150],
                stroke:[125,175,125],
                text:[0,100,0],
            },
        ],
    },deck:{
        start:[
            [],
            [['Strike',0,1],['Strike',0,1],['Strike',0,1],['Strike',0,1],['Defend',0,1],['Defend',0,1],['Defend',0,1],['Defend',0,1],['Step',0,1],['Step',0,1],['Step',0,1],['Step',0,1]],
        ]
    },level:[
        {
            map:[
                [{type:0},{type:0},{type:0},{type:-1},{type:-1}],
                [{type:0},{type:0},{type:0},{type:0},{type:-1}],
                [{type:0},{type:0},{type:0},{type:0},{type:0}],
                [{type:-1},{type:0},{type:0},{type:0},{type:0}],
                [{type:-1},{type:-1},{type:0},{type:0},{type:0}],
            ],
        },
    ]
}
stage={scale:0,scene:'battle'}
game={player:1,id:0,timer:0}
graphics={main:0,minor:[],combatant:[]}
transition={trigger:false,anim:0,scene:stage.scene}
inputs={mouse:{x:0,y:0},rel:{x:0,y:0},keys:[[false,false,false,false],[false,false,false,false]]}
a=0;b=0;c=0;d=0;e=0;f=0;g=0;h=0;i=0;j=0;k=0;l=0;m=0;n=0;o=0;p=0
la=0;lb=0;lc=0;ld=0;le=0;lf=0;lg=0;lh=0;li=0;lj=0;lk=0;ll=0;lm=0;ln=0;lo=0;lp=0