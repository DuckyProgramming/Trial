class combatant{
    constructor(layer,battle,x,y,relativeX,relativeY,tileX,tileY,type,team,id,direction){
        this.layer=layer
        this.battle=battle
        this.position={x:x,y:y}
        this.relativePosition={x:relativeX,y:relativeY}
        this.tilePosition={x:tileX,y:tileY}
        this.type=type
        this.team=team
        this.id=id
        this.offset={position:{x:0,y:0},life:{x:0,y:25}}
        this.fade=0

        this.name=types.combatant[this.type].name
        this.life=types.combatant[this.type].life
        this.behavior=types.combatant[this.type].behavior
        this.move=types.combatant[this.type].move
        this.attack=copyArray(types.combatant[this.type].attack)
        this.description=types.combatant[this.type].description

        this.order=this.id
        this.block=0
        this.intent=0
        this.activated=false
        this.moved=false
        this.dead=false
        this.base={position:{x:this.position.x,y:this.position.y},life:this.life}
        this.collect={life:this.life}
        this.infoAnim={life:1,block:0,size:1,description:0,upSize:false,intent:[],flash:[0,0],upFlash:[false,false]}

        this.status={main:[],name:['Double Damage'],display:[],active:[],position:[],size:[],
            behavior:[0],
            class:[0]}
        for(let a=0;a<1;a++){
            this.status.main.push(0)
            this.status.active.push(false)
            this.status.position.push(0)
            this.status.size.push(0)
        }

        for(let a=0,la=this.attack.length;a<la;a++){
            this.infoAnim.intent.push(0)
        }

        this.direction=0
        this.size=1

        switch(this.type){
            case 1:
                this.anim={direction:direction,head:direction,sword:1,mouth:{x:8,y:5,open:0},
                    eye:[0,0],eyeStyle:[0,0],under:{top:{x:1,y:1},bottom:{x:1,y:1},bow:{top:{position:{x:1,y:1},size:{x:1,y:1}},bottom:{position:{x:1,y:1},size:{x:1,y:1}}},under:{bottom:1}},
                    kimono:{bow:{position:{x:1,y:1},size:{x:1,y:1}}},
                    legs:[
                        {top:9,bottom:0,length:{top:16,bottom:16,sandal:{back:15.5,front:14.5}}},
                        {top:9,bottom:0,length:{top:16,bottom:16,sandal:{back:15.5,front:14.5}}}
                    ],arms:[
                        {top:24,bottom:9,length:{top:16,bottom:16}},
                        {top:24,bottom:9,length:{top:16,bottom:16}}
                    ]}

                this.kimono={decoration:[]}

                this.spin={
                    legs:[{top:-60,bottom:-120},{top:60,bottom:120}],
                    arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],
                    bow:{center:0,loop:[-24,24]},
                    under:{top:[],bottom:[],tanga:24,piece:36,under:{top:[-40,40],button:[-39,39],bottom:[0,-15,15,-9,9]}},
                    underBow:{top:{center:0,end:[-4,4],loop:[-12,12]},bottom:{center:0,end:[-5,5],loop:[-15,15]}},
                    sandal:[6,-6],eye:[-18,18],flower:[54,48,56],button:0,sword:75,mouth:216}

                this.color=graphics.combatant[0].color

                this.parts={eyeLevel:-72,flowerLevel:[-77.5,-75,-71.5],mouth:-65,
                    under:{top:-51,bottom:-31,bow:{top:2.75,bottom:-5}},
                    kimono:{main:-58,outside:-59,bow:-53},
                    legs:[
                        {top:{x:3,y:-32},middle:{x:0,y:0},bottom:{x:0,y:0},sandal:{back:{x:0,y:0},front:{x:0,y:0}}},
                        {top:{x:3,y:-32},middle:{x:0,y:0},bottom:{x:0,y:0},sandal:{back:{x:0,y:0},front:{x:0,y:0}}}
                    ],arms:[
                        {top:{x:3.5,y:-55},middle:{x:0,y:0},bottom:{x:0,y:0}},
                        {top:{x:3.5,y:-55},middle:{x:0,y:0},bottom:{x:0,y:0}}
                    ]}

                this.graphics={
                    legs:[
                        {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},sandal:{back:{x:0,y:0},front:{x:0,y:0}}},
                        {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},sandal:{back:{x:0,y:0},front:{x:0,y:0}}}
                    ],arms:[
                        {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},
                        {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}
                    ]}

                this.fades={flower:[1,1,1],eye:[1,1],band:[1,1],mouth:1,
                    sandal:{back:[1,1],front:[1,1]},
                    skin:{legs:1,arms:1,body:1,head:1,button:1},
                    kimono:{decoration:{fade:1,position:{x:1,y:1},size:{x:1,y:1}},
                    main:{back:{x:1,y:1},front:{x:1,y:1}},outside:{back:{x:1,y:1},front:{x:1,y:1}},bow:1},
                    under:{top:1,bottom:1,tanga:1,bow:{top:1,bottom:1},under:{top:1,button:1,bottom:1}},
                }

                this.trigger={display:{flower:[true,true,true],band:[true,true],mouth:true,
                    hair:{back:true,front:true,glow:true},eye:[true,true],sandal:{back:[true,true],front:[true,true]},
                    skin:{legs:true,arms:true,body:true,head:true,button:true},
                    kimono:{main:{back:true,front:true},outside:{back:true,front:true},bow:true,decoration:true},
                    under:{top:false,bottom:false,tanga:true,bow:{top:false,bottom:false},under:{top:true,button:false,bottom:false}},
                }}

                this.trigger.display.mode={
                    sandal:{edge:0},
                }

                this.trigger.display.extra={sword:true,damage:false}

                this.calc={int:[0,0,0,0]}

                this.sprites={spin:0,detail:15,spinDetail:0,spinDetailHead:0,temp:0}

                this.animSet={loop:0,flip:0}

                this.goal={anim:{direction:this.anim.direction,sword:true}}

                for(let g=0;g<25;g++){
                    this.spin.under.top.push(g*72/5)
                }
                for(let g=0;g<20;g++){
                    this.spin.under.bottom.push(g*18)
                }
                for(let g=0;g<2;g++){
                    this.kimono.decoration.push({spin:90-g*47.5,rotate:random(0,360),y:46-g*4.5,width:0.2,height:1,type:0})
                }
                this.kimono.decoration.push({spin:134,rotate:random(0,360),y:49,width:0.2,height:1,type:0})
                this.kimono.decoration.push({spin:180,rotate:random(0,360),y:50,width:0.2,height:1,type:0})
                this.kimono.decoration.push({spin:226,rotate:random(0,360),y:49,width:0.2,height:1,type:0})
                for(let g=0;g<7;g++){
                    this.kimono.decoration.push({spin:270+g*47.5,rotate:random(0,360),y:46-g*4.5,width:0.2,height:1,type:0})
                }
            
                this.kimono.decoration.push({spin:78,rotate:random(0,360),y:38,width:0.2,height:1,type:0})
                this.kimono.decoration.push({spin:118,rotate:random(0,360),y:42,width:0.2,height:1,type:0})
                this.kimono.decoration.push({spin:156,rotate:random(0,360),y:44,width:0.2,height:1,type:0})
                this.kimono.decoration.push({spin:204,rotate:random(0,360),y:44,width:0.2,height:1,type:0})
                this.kimono.decoration.push({spin:242,rotate:random(0,360),y:42,width:0.2,height:1,type:0})
                for(let g=0;g<5;g++){
                    this.kimono.decoration.push({spin:282+g*47.5,rotate:random(0,360),y:38-g*4.4,width:0.2,height:1,type:0})
                }
            
                this.kimono.decoration.push({spin:96,rotate:random(0,360),y:34,width:0.2,height:1,type:0})
                this.kimono.decoration.push({spin:138,rotate:random(0,360),y:36,width:0.2,height:1,type:0})
                this.kimono.decoration.push({spin:180,rotate:random(0,360),y:38,width:0.2,height:1,type:0})
                this.kimono.decoration.push({spin:222,rotate:random(0,360),y:36,width:0.2,height:1,type:0})
                for(let g=0;g<4;g++){
                    this.kimono.decoration.push({spin:264+g*47.5,rotate:random(0,360),y:32.5-g*4.4,width:0.2,height:1,type:0})
                }
            
                this.kimono.decoration.push({spin:154,rotate:random(0,360),y:30,width:0.2,height:1,type:0})
                this.kimono.decoration.push({spin:206,rotate:random(0,360),y:30,width:0.2,height:1,type:0})
                this.kimono.decoration.push({spin:254,rotate:random(0,360),y:27,width:0.2,height:1,type:0})
                this.kimono.decoration.push({spin:302,rotate:random(0,360),y:22,width:0.2,height:1,type:0})
            
                this.kimono.decoration.push({spin:218,rotate:random(0,360),y:24,width:0.2,height:1,type:0})
            break
            case 2:
                this.anim={direction:direction,head:direction,mouth:{x:8,y:5,open:0},
                    eye:[0,0],eyeStyle:[0,0],
                    legs:[
                        {top:9,bottom:0,length:{top:17,bottom:17}},
                        {top:9,bottom:0,length:{top:17,bottom:17}}
                    ],arms:[
                        {top:24,bottom:9,length:{top:17,bottom:17}},
                        {top:24,bottom:9,length:{top:17,bottom:17}}
                    ]}

                this.spin={
                    legs:[{top:-60,bottom:-120},{top:60,bottom:120}],
                    arms:[{top:-93,bottom:-75,lock:0},{top:93,bottom:75,lock:0}],
                    eye:[-18,18],mouth:216}

                this.color={
					skin:{head:[255,235,215],body:[95,95,95],legs:[90,90,90],arms:[100,100,100]},
					eye:{back:[0,0,0],front:[0,0,0],glow:[255,255,255]},
					mouth:{in:[200,100,100],out:[0,0,0]},
				}

                this.parts={eyeLevel:-78,mouth:-70,
                    legs:[
                        {top:{x:3.5,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0}},
                        {top:{x:3.5,y:-34},middle:{x:0,y:0},bottom:{x:0,y:0}}
                    ],arms:[
                        {top:{x:4,y:-61},middle:{x:0,y:0},bottom:{x:0,y:0}},
                        {top:{x:4,y:-61},middle:{x:0,y:0},bottom:{x:0,y:0}}
                    ]}

                this.graphics={
                    legs:[
                        {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}},
                        {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0}}
                    ],arms:[
                        {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}},
                        {top:{x:0,y:0},middle:{x:0,y:0},bottom:{x:0,y:0},topStack:{x:0,y:0},middleStack:{x:0,y:0},bottomStack:{x:0,y:0}}
                    ]}

                this.fades={eye:[1,1],mouth:1,
                    skin:{legs:1,arms:1,body:1,head:1},
                }

                this.trigger={display:{mouth:true,
                    eye:[true,true],
                    skin:{legs:true,arms:true,body:true,head:true},
                }}

                this.calc={int:[0,0,0,0]}

                this.animSet={loop:0,flip:0}

                this.goal={anim:{direction:this.anim.direction}}
            break
            default:
                this.anim={direction:direction}
                this.goal={anim:{direction:this.anim.direction}}
            break
        }
    }
    calculateParts(){
        switch(this.type){
            case 1:
                for(let g=0;g<2;g++){
                    this.parts.legs[g].middle.x=this.parts.legs[g].top.x+sin(this.anim.legs[g].top)*this.anim.legs[g].length.top
                    this.parts.legs[g].middle.y=this.parts.legs[g].top.y+cos(this.anim.legs[g].top)*this.anim.legs[g].length.top
                    this.parts.legs[g].bottom.x=this.parts.legs[g].middle.x+sin(this.anim.legs[g].bottom)*this.anim.legs[g].length.bottom
                    this.parts.legs[g].bottom.y=this.parts.legs[g].middle.y+cos(this.anim.legs[g].bottom)*this.anim.legs[g].length.bottom
                    this.parts.legs[g].sandal.front.x=this.parts.legs[g].middle.x+sin(this.anim.legs[g].bottom)*this.anim.legs[g].length.sandal.front
                    this.parts.legs[g].sandal.front.y=this.parts.legs[g].middle.y+cos(this.anim.legs[g].bottom)*this.anim.legs[g].length.sandal.front
                    this.parts.legs[g].sandal.back.x=this.parts.legs[g].middle.x+sin(this.anim.legs[g].bottom)*this.anim.legs[g].length.sandal.back
                    this.parts.legs[g].sandal.back.y=this.parts.legs[g].middle.y+cos(this.anim.legs[g].bottom)*this.anim.legs[g].length.sandal.back

                    this.graphics.legs[g].top.x=this.parts.legs[g].top.x*sin(this.spin.legs[g].top+this.anim.direction),
                    this.graphics.legs[g].top.y=this.parts.legs[g].top.y
                    this.graphics.legs[g].middle.x=this.parts.legs[g].middle.x*sin(this.spin.legs[g].top+this.anim.direction),
                    this.graphics.legs[g].middle.y=this.parts.legs[g].middle.y
                    this.graphics.legs[g].bottom.x=this.parts.legs[g].bottom.x*sin(this.spin.legs[g].bottom+this.anim.direction),
                    this.graphics.legs[g].bottom.y=this.parts.legs[g].bottom.y
                    this.graphics.legs[g].sandal.front.x=this.parts.legs[g].sandal.front.x*sin(this.spin.legs[g].bottom+this.anim.direction),
                    this.graphics.legs[g].sandal.front.y=this.parts.legs[g].sandal.front.y
                    this.graphics.legs[g].sandal.back.x=this.parts.legs[g].sandal.back.x*sin(this.spin.legs[g].bottom+this.anim.direction),
                    this.graphics.legs[g].sandal.back.y=this.parts.legs[g].sandal.back.y

                    this.parts.arms[g].middle.x=this.parts.arms[g].top.x+sin(this.anim.arms[g].top)*this.anim.arms[g].length.top
                    this.parts.arms[g].middle.y=this.parts.arms[g].top.y+cos(this.anim.arms[g].top)*this.anim.arms[g].length.top
                    this.parts.arms[g].bottom.x=this.parts.arms[g].middle.x+sin(this.anim.arms[g].bottom)*this.anim.arms[g].length.bottom
                    this.parts.arms[g].bottom.y=this.parts.arms[g].middle.y+cos(this.anim.arms[g].bottom)*this.anim.arms[g].length.bottom

                    this.graphics.arms[g].top.x=this.parts.arms[g].top.x*sin(this.spin.arms[g].top+this.anim.direction),
                    this.graphics.arms[g].top.y=this.parts.arms[g].top.y
                    this.graphics.arms[g].middle.x=this.parts.arms[g].middle.x*sin(this.spin.arms[g].top+this.anim.direction),
                    this.graphics.arms[g].middle.y=this.parts.arms[g].middle.y
                    this.graphics.arms[g].bottom.x=this.parts.arms[g].bottom.x*sin(this.spin.arms[g].bottom+this.anim.direction),
                    this.graphics.arms[g].bottom.y=this.parts.arms[g].bottom.y

                    this.graphics.arms[g].topStack.x=(this.parts.arms[g].top.x+(4-min(4,cos(this.spin.arms[g].top+this.anim.direction)*5+2))/2)*sin(this.spin.arms[g].top+this.anim.direction),
                    this.graphics.arms[g].topStack.y=this.parts.arms[g].top.y-(4-min(4,cos(this.spin.arms[g].top+this.anim.direction)*5+2))/4
                    this.graphics.arms[g].middleStack.x=(this.parts.arms[g].middle.x+(4-min(4,cos(this.spin.arms[g].top+this.anim.direction)*5+2))/2)*sin(this.spin.arms[g].top+this.anim.direction),
                    this.graphics.arms[g].middleStack.y=this.parts.arms[g].middle.y
                    this.graphics.arms[g].bottomStack.x=(this.parts.arms[g].bottom.x+(4-min(4,cos(this.spin.arms[g].top+this.anim.direction)*5+2))/2)*sin(this.spin.arms[g].bottom+this.anim.direction),
                    this.graphics.arms[g].bottomStack.y=this.parts.arms[g].bottom.y
                }
                this.sprites.spin=(((this.anim.direction%360)+360)%360)
                this.sprites.spinDetail=floor((((this.anim.direction%360)+360)%360)/this.sprites.detail)
                this.sprites.spinDetailHead=floor((((this.anim.head%360)+360)%360)/this.sprites.detail)
            break
            case 2:
                for(let g=0;g<2;g++){
                    this.parts.legs[g].middle.x=this.parts.legs[g].top.x+sin(this.anim.legs[g].top)*this.anim.legs[g].length.top
                    this.parts.legs[g].middle.y=this.parts.legs[g].top.y+cos(this.anim.legs[g].top)*this.anim.legs[g].length.top
                    this.parts.legs[g].bottom.x=this.parts.legs[g].middle.x+sin(this.anim.legs[g].bottom)*this.anim.legs[g].length.bottom
                    this.parts.legs[g].bottom.y=this.parts.legs[g].middle.y+cos(this.anim.legs[g].bottom)*this.anim.legs[g].length.bottom

                    this.graphics.legs[g].top.x=this.parts.legs[g].top.x*sin(this.spin.legs[g].top+this.anim.direction),
                    this.graphics.legs[g].top.y=this.parts.legs[g].top.y
                    this.graphics.legs[g].middle.x=this.parts.legs[g].middle.x*sin(this.spin.legs[g].top+this.anim.direction),
                    this.graphics.legs[g].middle.y=this.parts.legs[g].middle.y
                    this.graphics.legs[g].bottom.x=this.parts.legs[g].bottom.x*sin(this.spin.legs[g].bottom+this.anim.direction),
                    this.graphics.legs[g].bottom.y=this.parts.legs[g].bottom.y

                    this.parts.arms[g].middle.x=this.parts.arms[g].top.x+sin(this.anim.arms[g].top)*this.anim.arms[g].length.top
                    this.parts.arms[g].middle.y=this.parts.arms[g].top.y+cos(this.anim.arms[g].top)*this.anim.arms[g].length.top
                    this.parts.arms[g].bottom.x=this.parts.arms[g].middle.x+sin(this.anim.arms[g].bottom)*this.anim.arms[g].length.bottom
                    this.parts.arms[g].bottom.y=this.parts.arms[g].middle.y+cos(this.anim.arms[g].bottom)*this.anim.arms[g].length.bottom

                    this.graphics.arms[g].top.x=this.parts.arms[g].top.x*sin(this.spin.arms[g].top+this.anim.direction),
                    this.graphics.arms[g].top.y=this.parts.arms[g].top.y
                    this.graphics.arms[g].middle.x=this.parts.arms[g].middle.x*sin(this.spin.arms[g].top+this.anim.direction),
                    this.graphics.arms[g].middle.y=this.parts.arms[g].middle.y
                    this.graphics.arms[g].bottom.x=this.parts.arms[g].bottom.x*sin(this.spin.arms[g].bottom+this.anim.direction),
                    this.graphics.arms[g].bottom.y=this.parts.arms[g].bottom.y

                    this.graphics.arms[g].topStack.x=(this.parts.arms[g].top.x+(4-min(4,cos(this.spin.arms[g].top+this.anim.direction)*5+2))/2)*sin(this.spin.arms[g].top+this.anim.direction),
                    this.graphics.arms[g].topStack.y=this.parts.arms[g].top.y-(4-min(4,cos(this.spin.arms[g].top+this.anim.direction)*5+2))/4
                    this.graphics.arms[g].middleStack.x=(this.parts.arms[g].middle.x+(4-min(4,cos(this.spin.arms[g].top+this.anim.direction)*5+2))/2)*sin(this.spin.arms[g].top+this.anim.direction),
                    this.graphics.arms[g].middleStack.y=this.parts.arms[g].middle.y
                    this.graphics.arms[g].bottomStack.x=(this.parts.arms[g].bottom.x+(4-min(4,cos(this.spin.arms[g].top+this.anim.direction)*5+2))/2)*sin(this.spin.arms[g].bottom+this.anim.direction),
                    this.graphics.arms[g].bottomStack.y=this.parts.arms[g].bottom.y
                }
            break

        }
    }
    getTarget(){
        switch(this.attack[this.intent].type){
            case 1:
                return this.battle.tileManager.getTileIndex(this.tilePosition.x+transformDirection(0,this.goal.anim.direction)[0],this.tilePosition.y+transformDirection(0,this.goal.anim.direction)[1])
        }
    }
    setIntent(type){
        switch(type){
            case 0:
                switch(this.behavior){
                    case 0:
                        this.intent=(this.battle.turn.total-1)%this.attack.length
                    break
                }
            break
        }
    }
    activate(type,id){
        if(this.life>0&&!this.moved){
            let target=this.getTarget()
            switch(this.attack[this.intent].type){
                case 1:
                    if(target==-1){
                        this.targetTile={x:-1,y:-1}
                    }else{
                        this.targetTile=this.battle.tileManager.tiles[target].tilePosition
                    }
                break
            }
            for(let a=0,la=this.battle.combatantManager.combatants.length;a<la;a++){
                if(this.battle.combatantManager.combatants[a].team==0&&type==0||this.battle.combatantManager.combatants[a].id==id&&type==1){
                    switch(this.attack[this.intent].type){
                        case 1:
                            if(
                                this.battle.combatantManager.combatants[a].tilePosition.x==this.targetTile.x&&
                                this.battle.combatantManager.combatants[a].tilePosition.y==this.targetTile.y){
                                    this.activated=true
                            }
                        break
                    }
                }
            }
        }
    }
    takeDamage(value,user,spec){
        if(value>0&&this.life>0){
            let damage=value
            if(user>=0&&user<this.battle.combatantManager.combatants.length){
                if(this.battle.combatantManager.combatants[user].status.main[0]>0){
                    this.battle.combatantManager.combatants[user].status.main[0]--
                    damage*=2
                }
            }
            
            if(this.block>=damage){
                this.block-=damage
                this.infoAnim.upFlash[1]=true
            }else if(this.block>0){
                let damageLeft=damage-this.block
                this.block=0
                this.life-=damageLeft
                this.infoAnim.upFlash[0]=true
            }else{
                this.life-=damage
                this.infoAnim.upFlash[0]=true
            }
            this.battle.particleManager.createDamageNumber(this.position.x,this.position.y,damage)
        }
    }
    addBlock(value){
        this.block+=value
    }
    moveTile(direction,speed){
        this.position.x+=sin(direction)*speed
        this.position.y+=cos(direction)*speed
    }
    moveRelativeTile(direction,speed){
        this.relativePosition.x+=sin(direction)*speed
        this.relativePosition.y+=cos(direction)*speed
    }
    statusEffect(name,value){
        if(findList(name,this.status.name)>=0){
            this.status.main[findList(name,this.status.name)]+=value
        }
    }
    heal(amount){
        this.life=min(this.life+amount,this.base.life)
    }
    flashColor(color){
        return mergeColor(mergeColor(color,[150,150,150],this.infoAnim.flash[1]),[200,0,0],this.infoAnim.flash[0])
    }
    startAnimation(type){
        switch(this.type){
            case 1:
                switch(type){
                    case 0:
                        this.animSetloop=0
                        this.animSet.flip=floor(random(0,2))
                    break
                    case 1: case 2:
                        this.animSet.loop=0
                        this.goal.anim.sword=true
                    break
                    case 3: case 6:
                        this.animSet.loop=0
                        this.goal.anim.sword=false
                    break
                    case 5:
                        this.animSet.loop=0
                        this.anim.eyeStyle=[2,2]
                    break
                    case 7:
                        this.animSet.loop=0
                        this.goal.anim.sword=false
                        this.trigger.display.mode.sandal.edge=2
                    break
                }
            break
            case 2:
                switch(type){
                    case 0: case 2:
                        this.animSetloop=0
                        this.animSet.flip=floor(random(0,2))
                    break
                }
            break
        }
    }
    runAnimation(rate,type){
        switch(this.type){
            case 1:
                switch(type){
                    case 0:
                        this.animSet.loop+=rate
                        if(this.animSet.loop>=1){
                            this.animSet.loop-=1
                            this.animSet.flip=1-this.animSet.flip
                        }
                        this.animSet.flip=round(this.animSet.flip)
                        for(let g=0;g<2;g++){
                            if(sin((this.animSet.loop+this.animSet.flip+g)*180)>0){
                                this.anim.legs[g].top=9+sin((this.animSet.loop+this.animSet.flip+g)*180)*27
                                this.anim.legs[g].bottom=sin((this.animSet.loop+this.animSet.flip+g)*180)*21
                                this.spin.legs[g].top=(60+sin((this.animSet.loop+this.animSet.flip+g)*180)*-30)*(g*2-1)
                                this.spin.legs[g].bottom=(120+sin((this.animSet.loop+this.animSet.flip+g)*180)*-90)*(g*2-1)
                                this.anim.arms[g].top=24+sin((this.animSet.loop+this.animSet.flip+g)*180)*6
                                this.anim.arms[g].bottom=9+sin((this.animSet.loop+this.animSet.flip+g)*180)*9
                                this.spin.arms[g].top=(93+sin((this.animSet.loop+this.animSet.flip+g)*180)*24)*(g*2-1)
                                this.spin.arms[g].bottom=(75+sin((this.animSet.loop+this.animSet.flip+g)*180)*36)*(g*2-1)
                            }else{
                                this.anim.legs[g].top=9+sin((this.animSet.loop+this.animSet.flip+g)*180)*-9
                                this.anim.legs[g].bottom=sin((this.animSet.loop+this.animSet.flip+g)*180)*-30
                                this.spin.legs[g].top=(60+sin((this.animSet.loop+this.animSet.flip+g)*180)*-60)*(g*2-1)
                                this.spin.legs[g].bottom=(120+sin((this.animSet.loop+this.animSet.flip+g)*180)*-30)*(g*2-1)
                                this.anim.arms[g].top=24-sin((this.animSet.loop+this.animSet.flip+g)*180)*3
                                this.anim.arms[g].bottom=9-sin((this.animSet.loop+this.animSet.flip+g)*180)*18
                                this.spin.arms[g].top=(93-sin((this.animSet.loop+this.animSet.flip+g)*180)*-24)*(g*2-1)
                                this.spin.arms[g].bottom=(75-sin((this.animSet.loop+this.animSet.flip+g)*180)*-18)*(g*2-1)
                            }
                        }
                        this.fades.kimono.main.back.x=1+abs(sin(this.animSet.loop*180))*0.1
                        this.fades.kimono.main.front.x=1+abs(sin(this.animSet.loop*180))*0.1
                        this.fades.kimono.main.back.y=1-abs(sin(this.animSet.loop*180))*0.05
                        this.fades.kimono.main.front.y=1-abs(sin(this.animSet.loop*180))*0.05
                        this.fades.kimono.outside.back.x=1+abs(sin(this.animSet.loop*180))*0.1
                        this.fades.kimono.outside.front.x=1+abs(sin(this.animSet.loop*180))*0.1
                        this.fades.kimono.outside.back.y=1-abs(sin(this.animSet.loop*180))*0.05
                        this.fades.kimono.outside.front.y=1-abs(sin(this.animSet.loop*180))*0.05
                        this.fades.kimono.decoration.position.x=1+abs(sin(this.animSet.loop*180))*0.1
                        this.fades.kimono.decoration.position.y=1-abs(sin(this.animSet.loop*180))*0.05
                    break
                    case 1:
                        this.animSet.loop+=rate
                        this.anim.arms[1].top=24+sin(this.animSet.loop*90)*27
                        this.anim.arms[1].bottom=9+sin(this.animSet.loop*90)*45
                        this.spin.arms[1].top=93-sin(this.animSet.loop*90)*72
                        this.spin.arms[1].bottom=75-sin(this.animSet.loop*90)*105
                        this.spin.sword=75+sin(this.animSet.loop*90)*30
                    break
                    case 2:
                        this.animSet.loop+=rate
                        this.anim.arms[1].top=24+sin(this.animSet.loop*90)*36
                        this.anim.arms[1].bottom=9+sin(this.animSet.loop*90)*96
                        this.spin.arms[1].top=93-sin(this.animSet.loop*90)*63
                        this.spin.arms[1].bottom=75-sin(this.animSet.loop*90)*90
                        this.spin.sword=75+sin(this.animSet.loop*90)*45
                    break
                    case 3:
                        this.animSet.loop+=rate
                        for(let g=0;g<2;g++){
                            this.anim.arms[g].top=24+sin(this.animSet.loop*90)*24
                            this.anim.arms[g].bottom=9+sin(this.animSet.loop*90)*87
                            this.spin.arms[g].top=(93+sin(this.animSet.loop*90)*-63)*(g*2-1)
                            this.spin.arms[g].bottom=(75+sin(this.animSet.loop*90)*-60)*(g*2-1)
                        }
                    break
                    case 4:
                        this.animSet.loop+=rate
                        for(let g=0;g<2;g++){
                            this.anim.arms[g].top=24+abs(sin(this.animSet.loop*90))*12
                            this.anim.arms[g].bottom=9+abs(sin(this.animSet.loop*90))*15
                        }
                    break
                    case 5:
                        this.animSet.loop+=rate
                        for(let g=0;g<2;g++){
                            this.anim.eye[g]=constrain(abs(sin(this.animSet.loop*90))*1.5,0,1)
                        }
                    break
                    case 6:
                        this.animSet.loop+=rate
                        this.anim.arms[1].top=24+sin(this.animSet.loop*90)*6
                        this.anim.arms[1].bottom=9+sin(this.animSet.loop*90)*36
                        this.spin.arms[1].top=93+sin(this.animSet.loop*90)*-63
                        this.spin.arms[1].bottom=75+sin(this.animSet.loop*90)*-120
                    break
                    case 7:
                        this.animSet.loop+=rate
                        for(let g=0;g<2;g++){
                            this.anim.arms[g].top=24-constrain(this.animSet.loop,0,1)*6
                            this.anim.arms[g].bottom=9+constrain(this.animSet.loop,0,1)*27
                            this.anim.legs[g].top=9+constrain(this.animSet.loop,0,1)*9
                            this.anim.legs[g].bottom=constrain(this.animSet.loop,0,1)*96
                            this.spin.legs[g].top=(60+constrain(this.animSet.loop,0,1)*30)*(g*2-1)
                            this.anim.eye[g]=constrain(this.animSet.loop,0,1)
                            this.anim.legs[g].length.sandal.back=15.5+constrain(this.animSet.loop,0,1)*0.5
                            this.anim.legs[g].length.sandal.front=14.5+constrain(this.animSet.loop,0,1)*1.5
                        }
                        this.offset.position.y=constrain(this.animSet.loop,0,1)*20
                    break

                }
            break
            case 2:
                switch(type){
                    case 0:
                        this.animSet.loop+=rate
                        if(this.animSet.loop>=1){
                            this.animSet.loop-=1
                            this.animSet.flip=1-this.animSet.flip
                        }
                        this.animSet.flip=round(this.animSet.flip)
                        for(let g=0;g<2;g++){
                            if(sin((this.animSet.loop+this.animSet.flip+g)*180)>0){
                                this.anim.legs[g].top=9+sin((this.animSet.loop+this.animSet.flip+g)*180)*27
                                this.anim.legs[g].bottom=sin((this.animSet.loop+this.animSet.flip+g)*180)*21
                                this.spin.legs[g].top=(60+sin((this.animSet.loop+this.animSet.flip+g)*180)*-30)*(g*2-1)
                                this.spin.legs[g].bottom=(120+sin((this.animSet.loop+this.animSet.flip+g)*180)*-90)*(g*2-1)
                                this.anim.arms[g].top=24+sin((this.animSet.loop+this.animSet.flip+g)*180)*6
                                this.anim.arms[g].bottom=9+sin((this.animSet.loop+this.animSet.flip+g)*180)*9
                                this.spin.arms[g].top=(93+sin((this.animSet.loop+this.animSet.flip+g)*180)*24)*(g*2-1)
                                this.spin.arms[g].bottom=(75+sin((this.animSet.loop+this.animSet.flip+g)*180)*36)*(g*2-1)
                            }else{
                                this.anim.legs[g].top=9+sin((this.animSet.loop+this.animSet.flip+g)*180)*-9
                                this.anim.legs[g].bottom=sin((this.animSet.loop+this.animSet.flip+g)*180)*-30
                                this.spin.legs[g].top=(60+sin((this.animSet.loop+this.animSet.flip+g)*180)*-60)*(g*2-1)
                                this.spin.legs[g].bottom=(120+sin((this.animSet.loop+this.animSet.flip+g)*180)*-30)*(g*2-1)
                                this.anim.arms[g].top=24-sin((this.animSet.loop+this.animSet.flip+g)*180)*3
                                this.anim.arms[g].bottom=9-sin((this.animSet.loop+this.animSet.flip+g)*180)*18
                                this.spin.arms[g].top=(93-sin((this.animSet.loop+this.animSet.flip+g)*180)*-24)*(g*2-1)
                                this.spin.arms[g].bottom=(75-sin((this.animSet.loop+this.animSet.flip+g)*180)*-18)*(g*2-1)
                            }
                        }
                    break
                    case 2:
                        this.animSet.loop+=rate
                        for(let g=0;g<2;g++){
                            if(sin((this.animSet.loop+this.animSet.flip+g)*180)>0){
                                this.anim.arms[g].top=24+sin((this.animSet.loop+this.animSet.flip+g)*180)*36
                                this.anim.arms[g].bottom=9+sin((this.animSet.loop+this.animSet.flip+g)*180)*96
                                this.spin.arms[g].top=(93-sin((this.animSet.loop+this.animSet.flip+g)*180)*63)*(g*2-1)
                                this.spin.arms[g].bottom=(75-sin((this.animSet.loop+this.animSet.flip+g)*180)*90)*(g*2-1)
                            }
                        }
                    break

                }
            break
        }
    }
    minorDisplay(type,key){
        switch(this.type){
            case 1:
                switch(type){
                    case 0:
                        this.layer.push()
                        this.layer.translate(this.graphics.arms[key].bottom.x*0.9+this.graphics.arms[key].middle.x*0.1,this.graphics.arms[key].bottom.y*0.9+this.graphics.arms[key].middle.y*0.1)
                        this.layer.rotate(90+90*sign(sin(this.anim.direction+this.spin.arms[1].bottom-75))-this.spin.sword*sign(sin(this.anim.direction+this.spin.arms[1].bottom-75)))
                        this.layer.scale(1,constrain(sin(this.anim.direction+this.spin.arms[1].bottom-75)*2,-1,1)*this.anim.sword)
                        this.layer.fill(235,245,255,this.fade)
                        this.layer.noStroke()
                        this.layer.rect(0,-20,3,40)
                        this.layer.triangle(-3/2,-40,3/2,-40,0,-55)
                        this.layer.fill(160,170,180,this.fade)
                        this.layer.rect(3/4,-20,3/2,40)
                        this.layer.triangle(3/2,-40,0,-55,0,-40)
                        for(let g=0;g<4;g++){
                            this.layer.stroke(125+g*10,70+g*10,80+g*10,this.fade)
                            this.layer.strokeWeight(4-g)
                            this.layer.line(0,-3+g/2,0,3-g/2)
                        }
                        this.layer.pop()
                    break
                    case 1:
                        this.layer.stroke(this.color.band[1][0],this.color.band[1][1],this.color.band[1][2],this.fade*this.fades.band[0])
                        this.layer.strokeWeight(0.5)
                        if(this.trigger.display.extra.damage){
                            this.layer.line(
                                this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9-1.1*sin(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                                this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9-1.1*cos(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                                this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9-1.925*sin(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                                this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9-1.925*cos(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90))
                            this.layer.line(
                                this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9+1.925*sin(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                                this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9+1.925*cos(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                                this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9+1.1*sin(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                                this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9+1.1*cos(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90))
                        }else{
                            this.layer.line(
                                this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9+1.925*sin(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                                this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9+1.925*cos(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                                this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9-1.925*sin(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                                this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9-1.925*cos(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90))
                        }
                        this.layer.stroke(this.color.band[2][0],this.color.band[2][1],this.color.band[2][2],this.fade*this.fades.band[0])
                        this.layer.strokeWeight(0.6)
                        for(let g=0;g<4;g++){
                            if(!this.trigger.display.extra.damage||g<1||g>3){
                                this.layer.point(
                                    this.graphics.arms[key].middle.x*0.1+this.graphics.arms[key].bottom.x*0.9+(-1.8+g*1.2)*sin(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90),
                                    this.graphics.arms[key].middle.y*0.1+this.graphics.arms[key].bottom.y*0.9+(-1.8+g*1.2)*cos(atan2(this.graphics.arms[key].middle.x-this.graphics.arms[key].bottom.x,this.graphics.arms[key].middle.y-this.graphics.arms[key].bottom.y)+90))
                            }
                        }
                    break
                }
            break
            
        }
    }
    minorDisplayGeneral(type,key){
        switch(type){
            case 0:
                this.layer.noFill()
                if(this.anim.eyeStyle[key]==2&&this.anim.eye[key]>0){
                    this.layer.stroke(this.color.eye.back[0],this.color.eye.back[1],this.color.eye.back[2],this.fade*this.fades.eye[key])
                    this.layer.strokeWeight((4-this.anim.eye[key]*3)*constrain(cos(this.spin.eye[key]+this.anim.direction)*5,0,1))
                    this.layer.arc(sin(this.spin.eye[key]+this.anim.direction)*15,this.parts.eyeLevel-1*this.anim.eye[key],3*this.anim.eye[key],4*this.anim.eye[key],30,150)
                    this.layer.stroke(this.color.eye.front[0],this.color.eye.front[1],this.color.eye.front[2],this.fade*this.fades.eye[key])
                    this.layer.strokeWeight((3-this.anim.eye[key]*2)*constrain(cos(this.spin.eye[key]+this.anim.direction)*5,0,1))
                    this.layer.arc(sin(this.spin.eye[key]+this.anim.direction)*(15.5-this.anim.eye[key]*0.5),this.parts.eyeLevel-1*this.anim.eye[key],3*this.anim.eye[key],4*this.anim.eye[key],30,150)
                }else if(this.anim.eyeStyle[key]==1&&this.anim.eye[key]>0){
                    this.layer.stroke(this.color.eye.back[0],this.color.eye.back[1],this.color.eye.back[2],this.fade*this.fades.eye[key])
                    this.layer.strokeWeight((4-this.anim.eye[key]*3)*constrain(cos(this.spin.eye[key]+this.anim.direction)*5,0,1))
                    this.layer.arc(sin(this.spin.eye[key]+this.anim.direction)*15,this.parts.eyeLevel+2*this.anim.eye[key],3*this.anim.eye[key],4*this.anim.eye[key],-150,-30)
                    this.layer.stroke(this.color.eye.front[0],this.color.eye.front[1],this.color.eye.front[2],this.fade*this.fades.eye[key])
                    this.layer.strokeWeight((3-this.anim.eye[key]*2)*constrain(cos(this.spin.eye[key]+this.anim.direction)*5,0,1))
                    this.layer.arc(sin(this.spin.eye[key]+this.anim.direction)*(15.5-this.anim.eye[key]*0.5),this.parts.eyeLevel+2*this.anim.eye[key],3*this.anim.eye[key],4*this.anim.eye[key],-150,-30)
                }else{
                    this.layer.stroke(this.color.eye.back[0],this.color.eye.back[1],this.color.eye.back[2],this.fade*this.fades.eye[key])
                    this.layer.strokeWeight((4-this.anim.eye[key]*3)*constrain(cos(this.spin.eye[key]+this.anim.direction)*5,0,1))
                    this.layer.line(sin(this.spin.eye[key]+this.anim.direction)*15-(key*2-1)*cos(this.spin.eye[key]+this.anim.direction)*this.anim.eye[key]*2,this.parts.eyeLevel,sin(this.spin.eye[key]+this.anim.direction)*15+(key*2-1)*cos(this.spin.eye[key]+this.anim.direction)*this.anim.eye[key]*2,this.parts.eyeLevel-this.anim.eye[key]*2)
                    this.layer.line(sin(this.spin.eye[key]+this.anim.direction)*15-(key*2-1)*cos(this.spin.eye[key]+this.anim.direction)*this.anim.eye[key]*2,this.parts.eyeLevel,sin(this.spin.eye[key]+this.anim.direction)*15+(key*2-1)*cos(this.spin.eye[key]+this.anim.direction)*this.anim.eye[key]*2,this.parts.eyeLevel+this.anim.eye[key]*2)
                    this.layer.stroke(this.color.eye.front[0],this.color.eye.front[1],this.color.eye.front[2],this.fade*this.fades.eye[key])
                    this.layer.strokeWeight((3-this.anim.eye[key]*2)*constrain(cos(this.spin.eye[key]+this.anim.direction)*5,0,1))
                    this.layer.line(sin(this.spin.eye[key]+this.anim.direction)*(15.5-this.anim.eye[key]*0.5)-(key*2-1)*cos(this.spin.eye[key]+this.anim.direction)*this.anim.eye[key]*2,this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2,sin(this.spin.eye[key]+this.anim.direction)*(15.5-this.anim.eye[key]*0.5)+(key*2-1)*cos(this.spin.eye[key]+this.anim.direction)*this.anim.eye[key]*2,this.parts.eyeLevel-this.anim.eye[key]*2+0.2-this.anim.eye[key]*0.2)
                    this.layer.line(sin(this.spin.eye[key]+this.anim.direction)*(15.5-this.anim.eye[key]*0.5)-(key*2-1)*cos(this.spin.eye[key]+this.anim.direction)*this.anim.eye[key]*2,this.parts.eyeLevel+0.2-this.anim.eye[key]*0.2,sin(this.spin.eye[key]+this.anim.direction)*(15.5-this.anim.eye[key]*0.5)+(key*2-1)*cos(this.spin.eye[key]+this.anim.direction)*this.anim.eye[key]*2,this.parts.eyeLevel+this.anim.eye[key]*2+0.2-this.anim.eye[key]*0.2)
                    if(this.anim.eye[key]==0){
                        this.layer.stroke(this.color.eye.glow[0],this.color.eye.glow[1],this.color.eye.glow[2],this.fade*this.fades.eye[key]/4)
                        this.layer.strokeWeight(0.6)
                        this.layer.arc(sin(this.spin.eye[key]+this.anim.direction)*15.5,this.parts.eyeLevel,1.8,1.8,-72,-12)
                    }
                }
            break
            case 1:
                this.calc.int=this.anim.mouth.x/this.anim.mouth.y*cos(this.anim.direction)/(0.5+cos(this.anim.direction)*0.5)
                if(this.anim.mouth.open>0){
                    this.sprites.temp=createGraphics(100,50)
                    setupLayer(this.sprites.temp)
                    this.sprites.temp.fill(this.color.mouth.in[0],this.color.mouth.in[1],this.color.mouth.in[2],this.fade*this.fades.mouth)
                    this.sprites.temp.noStroke()
                    this.sprites.temp.arc(50,10,this.anim.mouth.x*cos(this.anim.direction)*5,this.anim.mouth.y*(0.5+cos(this.anim.direction)*0.5)*5,this.spin.mouth,180-this.spin.mouth)
                    this.sprites.temp.erase()
                    this.sprites.temp.rect(50,0,100,19+sin((this.spin.mouth/90)**(1/this.calc.int)*90)*5*this.anim.mouth.x*cos(this.anim.direction)/this.calc.int)
                    this.layer.image(this.sprites.temp,sin(this.anim.direction)*13-10,this.parts.mouth-2,20,10)
                }
                this.layer.noFill()
                this.layer.stroke(this.color.mouth.out[0],this.color.mouth.out[1],this.color.mouth.out[2],this.fade*this.fades.mouth)
                this.layer.strokeWeight(0.5-this.anim.mouth.open*0.25)
                this.layer.arc(sin(this.anim.direction)*13,this.parts.mouth,this.anim.mouth.x*cos(this.anim.direction),this.anim.mouth.y*(0.5+cos(this.anim.direction)*0.5),this.spin.mouth,180-this.spin.mouth)
                this.layer.strokeWeight(0.25*this.anim.mouth.open)
                this.layer.line(
                    sin(this.anim.direction)*13+cos((this.spin.mouth/90)**(1/this.calc.int)*90)*0.5*this.anim.mouth.x*cos(this.anim.direction),
                    (this.parts.mouth-0.1)+sin((this.spin.mouth/90)**(1/this.calc.int)*90)*0.5*this.anim.mouth.x*cos(this.anim.direction)/this.calc.int,
                    sin(this.anim.direction)*13-cos((this.spin.mouth/90)**(1/this.calc.int)*90)*0.5*this.anim.mouth.x*cos(this.anim.direction),
                    (this.parts.mouth-0.1)+sin((this.spin.mouth/90)**(1/this.calc.int)*90)*0.5*this.anim.mouth.x*cos(this.anim.direction)/this.calc.int
                )
            break
        }
    }
    display(){
        if(this.fade>0&&this.size>0){
            this.calculateParts()
            this.layer.push()
            this.layer.translate(this.position.x+this.offset.position.x,this.position.y+this.offset.position.y)
            this.layer.rotate(this.direction)
            this.layer.scale(this.size)
            switch(this.type){
                case 0:
                    this.layer.rotate(-this.anim.direction)
                    this.layer.fill(this.flashColor([200,200,200])[0],this.flashColor([200,200,200])[1],this.flashColor([200,200,200])[2],this.fade)
                    this.layer.noStroke()
                    this.layer.triangle(-6,-8,6,-8,0,12)
                break
                case 1:
                    if(this.trigger.display.hair.back){
                        this.layer.image(graphics.combatant[0].sprites.hair.back[this.sprites.spinDetailHead],-25*this.fade,-75-20*this.fade,50*this.fade,100*this.fade)
                    }
                    for(let g=0;g<2;g++){
                        if(this.trigger.display.extra.sword&&cos(this.spin.arms[g].top+this.anim.direction)<=-0.6&&g==1){
                            this.minorDisplay(0,g)
                        }
                        if(this.trigger.display.skin.arms&&cos(this.spin.arms[g].top+this.anim.direction)<=-0.6){
                            this.layer.stroke(this.flashColor(this.color.skin.arms)[0],this.flashColor(this.color.skin.arms)[1],this.flashColor(this.color.skin.arms)[2],this.fade*this.fades.skin.arms)
                            this.layer.strokeWeight(4)
                            this.layer.line(this.graphics.arms[g].top.x,this.graphics.arms[g].top.y,this.graphics.arms[g].middle.x,this.graphics.arms[g].middle.y)
                            this.layer.line(this.graphics.arms[g].middle.x,this.graphics.arms[g].middle.y,this.graphics.arms[g].bottom.x,this.graphics.arms[g].bottom.y)
                        }
                        if(this.trigger.display.band[1]&&cos(this.spin.arms[g].top+this.anim.direction)<=-0.6&&g==0){
                            this.minorDisplay(1,g)
                        }
                    }
                    if(this.trigger.display.kimono.outside.back){
                        if(this.trigger.display.extra.damage){
                            this.layer.image(graphics.combatant[0].sprites.kimono.outsideDamage.back[this.sprites.spinDetail],-15*this.fade*this.fades.kimono.outside.back.x,this.parts.kimono.outside-15*this.fades.kimono.outside.back.y,30*this.fade*this.fades.kimono.outside.back.x,66*this.fade*this.fades.kimono.outside.back.y)
                        }else{
                            this.layer.image(graphics.combatant[0].sprites.kimono.outside.back[this.sprites.spinDetail],-15*this.fade*this.fades.kimono.outside.back.x,this.parts.kimono.outside-15*this.fades.kimono.outside.back.y,30*this.fade*this.fades.kimono.outside.back.x,66*this.fade*this.fades.kimono.outside.back.y)
                        }
                    }
                    if(this.trigger.display.kimono.main.back){
                        if(this.trigger.display.extra.damage){
                            this.layer.image(graphics.combatant[0].sprites.kimono.mainDamage.back[this.sprites.spinDetail],-15*this.fade*this.fades.kimono.main.back.x,this.parts.kimono.main-15*this.fades.kimono.main.back.y,30*this.fade*this.fades.kimono.main.back.x,66*this.fade*this.fades.kimono.main.back.y)
                        }else{
                            this.layer.image(graphics.combatant[0].sprites.kimono.main.back[this.sprites.spinDetail],-15*this.fade*this.fades.kimono.main.back.x,this.parts.kimono.main-15*this.fades.kimono.main.back.y,30*this.fade*this.fades.kimono.main.back.x,66*this.fade*this.fades.kimono.main.back.y)
                        }
                    }
                    if(this.trigger.display.under.under.button&&cos(this.spin.under.under.button[0]+this.anim.direction)<=0){
                        this.layer.noStroke()
                        this.layer.fill(this.flashColor(mergeColor(this.color.skin.body,this.color.under.under.button,-cos(this.spin.under.under.button[0]+this.anim.direction)/4+0.75))[0],this.flashColor(mergeColor(this.color.skin.body,this.color.under.under.button,-cos(this.spin.under.under.button[0]+this.anim.direction)/4+0.75))[1],this.flashColor(mergeColor(this.color.skin.body,this.color.under.under.button,-cos(this.spin.under.under.button[0]+this.anim.direction)/4+0.75))[2],this.fade*this.fades.under.under.button)
                        this.layer.ellipse(sin(this.spin.under.under.button[0]+this.anim.direction)*5.5,-49.5,cos(this.spin.under.under.button[0]+this.anim.direction)*0.25+1,1.25)
                    }
                    if(this.trigger.display.under.under.button&&cos(this.spin.under.under.button[1]+this.anim.direction)<=0){
                        this.layer.noStroke()
                        this.layer.fill(this.flashColor(mergeColor(this.color.skin.body,this.color.under.under.button,-cos(this.spin.under.under.button[1]+this.anim.direction)/4+0.75))[0],this.flashColor(mergeColor(this.color.skin.body,this.color.under.under.button,-cos(this.spin.under.under.button[1]+this.anim.direction)/4+0.75))[1],this.flashColor(mergeColor(this.color.skin.body,this.color.under.under.button,-cos(this.spin.under.under.button[1]+this.anim.direction)/4+0.75))[2],this.fade*this.fades.under.under.button)
                        this.layer.ellipse(sin(this.spin.under.under.button[1]+this.anim.direction)*5.5,-49.5,cos(this.spin.under.under.button[1]+this.anim.direction)*0.25+1,1.25)
                    }
                    if(this.trigger.display.under.under.top&&cos(this.spin.under.under.top[0]+this.anim.direction)<=0){
                        this.layer.noStroke()
                        this.layer.fill(this.flashColor(mergeColor(this.color.skin.body,this.color.under.under.top,-cos(this.spin.under.under.top[0]+this.anim.direction)))[0],this.flashColor(mergeColor(this.color.skin.body,this.color.under.under.top,-cos(this.spin.under.under.top[0]+this.anim.direction)))[1],this.flashColor(mergeColor(this.color.skin.body,this.color.under.under.top,-cos(this.spin.under.under.top[0]+this.anim.direction)))[2],this.fade*this.fades.under.under.top)
                        this.layer.ellipse(sin(this.spin.under.under.top[0]+this.anim.direction)*4.2,-50,cos(this.spin.under.under.top[0]+this.anim.direction)*2.5+3.5,6)
                    }
                    if(this.trigger.display.under.under.top&&cos(this.spin.under.under.top[1]+this.anim.direction)<=0){
                        this.layer.noStroke()
                        this.layer.fill(this.flashColor(mergeColor(this.color.skin.body,this.color.under.under.top,-cos(this.spin.under.under.top[1]+this.anim.direction)))[0],this.flashColor(mergeColor(this.color.skin.body,this.color.under.under.top,-cos(this.spin.under.under.top[1]+this.anim.direction)))[1],this.flashColor(mergeColor(this.color.skin.body,this.color.under.under.top,-cos(this.spin.under.under.top[1]+this.anim.direction)))[2],this.fade*this.fades.under.under.top)
                        this.layer.ellipse(sin(this.spin.under.under.top[1]+this.anim.direction)*4.2,-50,cos(this.spin.under.under.top[1]+this.anim.direction)*2.5+3.5,6)
                    }
                    if(this.trigger.display.skin.body){
                        this.layer.noStroke()
                        this.layer.fill(this.flashColor(this.color.skin.body)[0],this.flashColor(this.color.skin.body)[1],this.flashColor(this.color.skin.body)[2],this.fade*this.fades.skin.body)
                        this.layer.ellipse(0,-46,11,30)
                    }
                    if(this.trigger.display.skin.button){
                        if(cos(this.spin.button+this.anim.direction)>0){
                            this.layer.noStroke()
                            this.layer.fill(this.flashColor(this.color.skin.button)[0],this.flashColor(this.color.skin.button)[1],this.flashColor(this.color.skin.button)[2],this.fade*this.fades.skin.button)
                            this.layer.ellipse(sin(this.spin.button+this.anim.direction)*5.2,-42,1*cos(this.spin.button+this.anim.direction),2)
                        }
                    }
                    for(let g=0;g<2;g++){
                        if(this.trigger.display.extra.sword&&cos(this.spin.arms[g].top+this.anim.direction)>-0.6&&cos(this.spin.arms[g].top+this.anim.direction)<0.4&&g==1){
                            this.minorDisplay(0,g)
                        }
                        if(this.trigger.display.skin.arms&&cos(this.spin.arms[g].top+this.anim.direction)<0.4&&cos(this.spin.arms[g].top+this.anim.direction)>-0.6){
                            this.layer.stroke(this.flashColor(this.color.skin.arms)[0],this.flashColor(this.color.skin.arms)[1],this.flashColor(this.color.skin.arms)[2],this.fade*this.fades.skin.arms)
                            this.layer.strokeWeight(4)
                            this.layer.line(this.graphics.arms[g].top.x,this.graphics.arms[g].top.y,this.graphics.arms[g].middle.x,this.graphics.arms[g].middle.y)
                            this.layer.line(this.graphics.arms[g].middle.x,this.graphics.arms[g].middle.y,this.graphics.arms[g].bottom.x,this.graphics.arms[g].bottom.y)
                        }
                        if(this.trigger.display.band[1]&&cos(this.spin.arms[g].top+this.anim.direction)<0.4&&cos(this.spin.arms[g].top+this.anim.direction)>-0.6&&g==0){
                            this.minorDisplay(1,g)
                        }
                        for(let h=0;h<2;h++){
                            if((g==0&&h==0||g==1&&h==1)&&cos(this.spin.legs[0].bottom+this.anim.direction)<=cos(this.spin.legs[1].bottom+this.anim.direction)||(g==0&&h==1||g==1&&h==0)&&cos(this.spin.legs[0].bottom+this.anim.direction)>cos(this.spin.legs[1].bottom+this.anim.direction)){
                                if(this.fades.sandal.back[h]>0&&this.trigger.display.sandal.back[h]){
                                    this.layer.translate(this.graphics.legs[h].sandal.back.x,this.graphics.legs[h].sandal.back.y+1.5)
                                    this.layer.scale(1.2,0.6)
                                    this.layer.rotate(-this.anim.direction+this.spin.sandal[h])
                                    if(this.trigger.display.extra.damage){
                                        this.layer.image(graphics.minor[21+h],-4*this.fades.sandal.back[h]*this.fade,-4*this.fades.sandal.back[h]*this.fade,8*this.fades.sandal.back[h]*this.fade,8*this.fades.sandal.back[h]*this.fade)
                                    }else{
                                        this.layer.image(graphics.minor[1],-4*this.fades.sandal.back[h]*this.fade,-4*this.fades.sandal.back[h]*this.fade,8*this.fades.sandal.back[h]*this.fade,8*this.fades.sandal.back[h]*this.fade)
                                    }
                                    this.layer.rotate(this.anim.direction-this.spin.sandal[h])
                                    this.layer.scale(5/6,5/3)
                                    this.layer.translate(-this.graphics.legs[h].sandal.back.x,-this.graphics.legs[h].sandal.back.y-1.5)
                                }
                                if(this.fades.sandal.front[h]>0&&this.trigger.display.sandal.front[h]){
                                    this.layer.translate(this.graphics.legs[h].sandal.front.x,this.graphics.legs[h].sandal.front.y+1.5)
                                    this.layer.scale(1.2,0.6)
                                    this.layer.rotate(-this.anim.direction+this.spin.sandal[h])
                                    for(let i=0;i<16;i++){
                                        if((cos(this.anim.direction+(65-floor(i/2)*5*this.trigger.display.mode.sandal.edge)*((i%2)*2-1)-this.spin.sandal[h])<=0.1&&this.trigger.display.mode.sandal.edge<=1||i%2!=h&&this.trigger.display.mode.sandal.edge==2)&&!(this.trigger.display.extra.damage&&floor(i/2)%2==1)){
                                            this.layer.image(graphics.minor[i+2],-4*this.fades.sandal.front[h]*this.fade,-4*this.fades.sandal.front[h]*this.fade,8*this.fades.sandal.front[h]*this.fade,8*this.fades.sandal.front[h]*this.fade)
                                        }
                                    }
                                    this.layer.rotate(this.anim.direction-this.spin.sandal[h])
                                    this.layer.scale(5/6,5/3)
                                    this.layer.translate(-this.graphics.legs[h].sandal.front.x,-this.graphics.legs[h].sandal.front.y-1.5)
                                }
                                if(this.trigger.display.skin.legs){
                                    this.layer.stroke(this.flashColor(this.color.skin.legs)[0],this.flashColor(this.color.skin.legs)[1],this.flashColor(this.color.skin.legs)[2],this.fade*this.fades.skin.legs)
                                    this.layer.strokeWeight(4)
                                    this.layer.line(this.graphics.legs[h].top.x,this.graphics.legs[h].top.y,this.graphics.legs[h].middle.x,this.graphics.legs[h].middle.y)
                                    this.layer.line(this.graphics.legs[h].middle.x,this.graphics.legs[h].middle.y,this.graphics.legs[h].bottom.x,this.graphics.legs[h].bottom.y)
                                }
                                if(this.trigger.display.band[0]&&h==1){
                                    this.layer.noFill()
                                    this.layer.stroke(this.color.band[0][0],this.color.band[0][1],this.color.band[0][2],this.fade*this.fades.band[0])
                                    this.layer.strokeWeight(0.45)
                                    this.layer.line(
                                        this.graphics.legs[h].top.x*0.5+this.graphics.legs[h].middle.x*0.5+1.9*sin(atan2(this.graphics.legs[h].top.x-this.graphics.legs[h].middle.x,this.graphics.legs[h].top.y-this.graphics.legs[h].middle.y)+90),
                                        this.graphics.legs[h].top.y*0.5+this.graphics.legs[h].middle.y*0.5+1.9*cos(atan2(this.graphics.legs[h].top.x-this.graphics.legs[h].middle.x,this.graphics.legs[h].top.y-this.graphics.legs[h].middle.y)+90),
                                        this.graphics.legs[h].top.x*0.5+this.graphics.legs[h].middle.x*0.5-1.9*sin(atan2(this.graphics.legs[h].top.x-this.graphics.legs[h].middle.x,this.graphics.legs[h].top.y-this.graphics.legs[h].middle.y)+90),
                                        this.graphics.legs[h].top.y*0.5+this.graphics.legs[h].middle.y*0.5-1.9*cos(atan2(this.graphics.legs[h].top.x-this.graphics.legs[h].middle.x,this.graphics.legs[h].top.y-this.graphics.legs[h].middle.y)+90))
                                    this.layer.strokeWeight(0.3)
                                    if(this.trigger.display.extra.damage){
                                        this.layer.line(
                                            this.graphics.legs[h].top.x*0.5+this.graphics.legs[h].middle.x*0.5,this.graphics.legs[h].top.y*0.5+this.graphics.legs[h].middle.y*0.5,
                                            this.graphics.legs[h].top.x*0.375+this.graphics.legs[h].middle.x*0.625-0.3125*sin(atan2(this.graphics.legs[h].top.x-this.graphics.legs[h].middle.x,this.graphics.legs[h].top.y-this.graphics.legs[h].middle.y)+90),
                                            this.graphics.legs[h].top.y*0.375+this.graphics.legs[h].middle.y*0.625-0.3125*cos(atan2(this.graphics.legs[h].top.x-this.graphics.legs[h].middle.x,this.graphics.legs[h].top.y-this.graphics.legs[h].middle.y)+90))
                                        this.layer.line(
                                            this.graphics.legs[h].top.x*0.5+this.graphics.legs[h].middle.x*0.5,this.graphics.legs[h].top.y*0.5+this.graphics.legs[h].middle.y*0.5,
                                            this.graphics.legs[h].top.x*0.4+this.graphics.legs[h].middle.x*0.6+0.25*sin(atan2(this.graphics.legs[h].top.x-this.graphics.legs[h].middle.x,this.graphics.legs[h].top.y-this.graphics.legs[h].middle.y)+90),
                                            this.graphics.legs[h].top.y*0.4+this.graphics.legs[h].middle.y*0.6+0.25*cos(atan2(this.graphics.legs[h].top.x-this.graphics.legs[h].middle.x,this.graphics.legs[h].top.y-this.graphics.legs[h].middle.y)+90))
                                        this.layer.arc(
                                            this.graphics.legs[h].top.x*0.46+this.graphics.legs[h].middle.x*0.54-0.5*sin(atan2(this.graphics.legs[h].top.x-this.graphics.legs[h].middle.x,this.graphics.legs[h].top.y-this.graphics.legs[h].middle.y)+90),
                                            this.graphics.legs[h].top.y*0.46+this.graphics.legs[h].middle.y*0.54-0.5*cos(atan2(this.graphics.legs[h].top.x-this.graphics.legs[h].middle.x,this.graphics.legs[h].top.y-this.graphics.legs[h].middle.y)+90),1,1,-150,30)
                                        this.layer.arc(
                                            this.graphics.legs[h].top.x*0.46+this.graphics.legs[h].middle.x*0.54+0.5*sin(atan2(this.graphics.legs[h].top.x-this.graphics.legs[h].middle.x,this.graphics.legs[h].top.y-this.graphics.legs[h].middle.y)+90),
                                            this.graphics.legs[h].top.y*0.46+this.graphics.legs[h].middle.y*0.54+0.5*cos(atan2(this.graphics.legs[h].top.x-this.graphics.legs[h].middle.x,this.graphics.legs[h].top.y-this.graphics.legs[h].middle.y)+90),1,1,-210,-30)
                                    }else{
                                        this.layer.line(
                                            this.graphics.legs[h].top.x*0.5+this.graphics.legs[h].middle.x*0.5,this.graphics.legs[h].top.y*0.5+this.graphics.legs[h].middle.y*0.5,
                                            this.graphics.legs[h].top.x*0.35+this.graphics.legs[h].middle.x*0.65-0.375*sin(atan2(this.graphics.legs[h].top.x-this.graphics.legs[h].middle.x,this.graphics.legs[h].top.y-this.graphics.legs[h].middle.y)+90),
                                            this.graphics.legs[h].top.y*0.35+this.graphics.legs[h].middle.y*0.65-0.375*cos(atan2(this.graphics.legs[h].top.x-this.graphics.legs[h].middle.x,this.graphics.legs[h].top.y-this.graphics.legs[h].middle.y)+90))
                                        this.layer.line(
                                            this.graphics.legs[h].top.x*0.5+this.graphics.legs[h].middle.x*0.5,this.graphics.legs[h].top.y*0.5+this.graphics.legs[h].middle.y*0.5,
                                            this.graphics.legs[h].top.x*0.35+this.graphics.legs[h].middle.x*0.65+0.375*sin(atan2(this.graphics.legs[h].top.x-this.graphics.legs[h].middle.x,this.graphics.legs[h].top.y-this.graphics.legs[h].middle.y)+90),
                                            this.graphics.legs[h].top.y*0.35+this.graphics.legs[h].middle.y*0.65+0.375*cos(atan2(this.graphics.legs[h].top.x-this.graphics.legs[h].middle.x,this.graphics.legs[h].top.y-this.graphics.legs[h].middle.y)+90))
                                        this.layer.ellipse(
                                            this.graphics.legs[h].top.x*0.46+this.graphics.legs[h].middle.x*0.54-0.5*sin(atan2(this.graphics.legs[h].top.x-this.graphics.legs[h].middle.x,this.graphics.legs[h].top.y-this.graphics.legs[h].middle.y)+90),
                                            this.graphics.legs[h].top.y*0.46+this.graphics.legs[h].middle.y*0.54-0.5*cos(atan2(this.graphics.legs[h].top.x-this.graphics.legs[h].middle.x,this.graphics.legs[h].top.y-this.graphics.legs[h].middle.y)+90),1,1)
                                        this.layer.ellipse(
                                            this.graphics.legs[h].top.x*0.46+this.graphics.legs[h].middle.x*0.54+0.5*sin(atan2(this.graphics.legs[h].top.x-this.graphics.legs[h].middle.x,this.graphics.legs[h].top.y-this.graphics.legs[h].middle.y)+90),
                                            this.graphics.legs[h].top.y*0.46+this.graphics.legs[h].middle.y*0.54+0.5*cos(atan2(this.graphics.legs[h].top.x-this.graphics.legs[h].middle.x,this.graphics.legs[h].top.y-this.graphics.legs[h].middle.y)+90),1,1)
                                    }
                                }
                                if(this.fades.sandal.front[h]>0&&this.trigger.display.sandal.front[h]){
                                    this.layer.translate(this.graphics.legs[h].sandal.front.x,this.graphics.legs[h].sandal.front.y+1.5)
                                    this.layer.scale(1.2,0.6)
                                    this.layer.rotate(-this.anim.direction+this.spin.sandal[h])
                                    for(let i=0;i<16;i++){
                                        if((cos(this.anim.direction+(65-floor(i/2)*5*this.trigger.display.mode.sandal.edge)*((i%2)*2-1)-this.spin.sandal[h])>0.1&&this.trigger.display.mode.sandal.edge<=1||i%2==h&&this.trigger.display.mode.sandal.edge==2)&&!(this.trigger.display.extra.damage&&floor(i/2)%2==1)){
                                            this.layer.image(graphics.minor[i+2],-4*this.fades.sandal.front[h]*this.fade,-4*this.fades.sandal.front[h]*this.fade,8*this.fades.sandal.front[h]*this.fade,8*this.fades.sandal.front[h]*this.fade)
                                        }
                                    }
                                    this.layer.rotate(this.anim.direction-this.spin.sandal[h])
                                    this.layer.scale(5/6,5/3)
                                    this.layer.translate(-this.graphics.legs[h].sandal.front.x,-this.graphics.legs[h].sandal.front.y-1.5)
                                }
                            }
                        }
                    }
                    if(this.trigger.display.under.under.top&&cos(this.spin.under.under.top[0]+this.anim.direction)>0){
                        this.layer.noStroke()
                        this.layer.fill(this.flashColor(mergeColor(this.color.skin.body,this.color.under.under.top,cos(this.spin.under.under.top[0]+this.anim.direction)))[0],this.flashColor(mergeColor(this.color.skin.body,this.color.under.under.top,cos(this.spin.under.under.top[0]+this.anim.direction)))[1],this.flashColor(mergeColor(this.color.skin.body,this.color.under.under.top,cos(this.spin.under.under.top[0]+this.anim.direction)))[2],this.fade*this.fades.under.under.top)
                        this.layer.ellipse(sin(this.spin.under.under.top[0]+this.anim.direction)*4.2,-50,cos(this.spin.under.under.top[0]+this.anim.direction)*2.5+3.5,6)
                    }
                    if(this.trigger.display.under.under.top&&cos(this.spin.under.under.top[1]+this.anim.direction)>0){
                        this.layer.noStroke()
                        this.layer.fill(this.flashColor(mergeColor(this.color.skin.body,this.color.under.under.top,cos(this.spin.under.under.top[1]+this.anim.direction)))[0],this.flashColor(mergeColor(this.color.skin.body,this.color.under.under.top,cos(this.spin.under.under.top[1]+this.anim.direction)))[1],this.flashColor(mergeColor(this.color.skin.body,this.color.under.under.top,cos(this.spin.under.under.top[1]+this.anim.direction)))[2],this.fade*this.fades.under.under.top)
                        this.layer.ellipse(sin(this.spin.under.under.top[1]+this.anim.direction)*4.2,-50,cos(this.spin.under.under.top[1]+this.anim.direction)*2.5+3.5,6)
                    }
                    if(this.trigger.display.under.under.button&&cos(this.spin.under.under.button[0]+this.anim.direction)>0){
                        this.layer.noStroke()
                        this.layer.fill(this.flashColor(mergeColor(this.color.skin.body,this.color.under.under.button,cos(this.spin.under.under.button[0]+this.anim.direction)/4+0.75))[0],this.flashColor(mergeColor(this.color.skin.body,this.color.under.under.button,cos(this.spin.under.under.button[0]+this.anim.direction)/4+0.75))[1],this.flashColor(mergeColor(this.color.skin.body,this.color.under.under.button,cos(this.spin.under.under.button[0]+this.anim.direction)/4+0.75))[2],this.fade*this.fades.under.under.button)
                        this.layer.ellipse(sin(this.spin.under.under.button[0]+this.anim.direction)*5.5,-49.5,cos(this.spin.under.under.button[0]+this.anim.direction)*0.25+1,1.25)
                    }
                    if(this.trigger.display.under.under.button&&cos(this.spin.under.under.button[1]+this.anim.direction)>0){
                        this.layer.noStroke()
                        this.layer.fill(this.flashColor(mergeColor(this.color.skin.body,this.color.under.under.button,cos(this.spin.under.under.button[1]+this.anim.direction)/4+0.75))[0],this.flashColor(mergeColor(this.color.skin.body,this.color.under.under.button,cos(this.spin.under.under.button[1]+this.anim.direction)/4+0.75))[1],this.flashColor(mergeColor(this.color.skin.body,this.color.under.under.button,cos(this.spin.under.under.button[1]+this.anim.direction)/4+0.75))[2],this.fade*this.fades.under.under.button)
                        this.layer.ellipse(sin(this.spin.under.under.button[1]+this.anim.direction)*5.5,-49.5,cos(this.spin.under.under.button[1]+this.anim.direction)*0.25+1,1.25)
                    }
                    if(this.trigger.display.under.top){
                        this.sprites.temp=createGraphics(80,80)
                        setupLayer(this.sprites.temp)
                        this.sprites.temp.translate(40,0)
                        this.sprites.temp.noStroke()
                        this.sprites.temp.fill(this.color.under.outside[0],this.color.under.outside[1],this.color.under.outside[2],this.fade*this.fades.under.top)
                        for(let g=0;g<2;g++){
                            if(cos(this.spin.under.under.top[g]+this.anim.direction)){
                                if(sin(this.spin.under.under.top[g]+this.anim.direction+27)*9-sin(this.spin.under.under.top[g]+this.anim.direction)*6>0){
                                    this.sprites.temp.arc(sin(this.spin.under.under.top[g]+this.anim.direction)*18,75,sin(this.spin.under.under.top[g]+this.anim.direction+27)*36-sin(this.spin.under.under.top[g]+this.anim.direction)*24,70,-90,0)
                                    this.sprites.temp.ellipse(sin(this.spin.under.under.top[g]+this.anim.direction)*18,75,4,70)
                                }
                                if(sin(this.spin.under.under.top[g]+this.anim.direction)*6-sin(this.spin.under.under.top[g]+this.anim.direction-27)*9>0){
                                    this.sprites.temp.arc(sin(this.spin.under.under.top[g]+this.anim.direction)*18,75,sin(this.spin.under.under.top[g]+this.anim.direction)*24-sin(this.spin.under.under.top[g]+this.anim.direction-27)*36,70,-180,-90)
                                    this.sprites.temp.ellipse(sin(this.spin.under.under.top[g]+this.anim.direction)*18,75,4,70)
                                }
                            }
                        }
                        this.sprites.temp.rect(0,59,44,2)
                        this.sprites.temp.erase()
                        this.sprites.temp.rect(0,70,80,20)
                        this.layer.image(this.sprites.temp,-10*this.anim.under.top.x,this.parts.under.top-12*this.anim.under.top.y,20*this.anim.under.top.x,20*this.anim.under.top.y)
                        this.layer.noStroke()
                        this.layer.fill(this.color.under.outside[0],this.color.under.outside[1],this.color.under.outside[2],this.fade*this.fades.under.top)
                        if(this.trigger.display.under.under.button&&cos(this.spin.under.under.button[0]+this.anim.direction)>-0.4){
                            this.layer.ellipse(sin(this.spin.under.under.button[0]+this.anim.direction)*5.5,-49.5,cos(this.spin.under.under.button[0]+this.anim.direction)*0.25+1,1.5)
                        }
                        if(this.trigger.display.under.under.button&&cos(this.spin.under.under.button[1]+this.anim.direction)>-0.4){
                            this.layer.ellipse(sin(this.spin.under.under.button[1]+this.anim.direction)*5.5,-49.5,cos(this.spin.under.under.button[1]+this.anim.direction)*0.25+1,1.5)
                        }
                        this.layer.fill(this.color.under.fringe[0],this.color.under.fringe[1],this.color.under.fringe[2],this.fade)
                        for(let g=0,lg=this.spin.under.top.length;g<lg;g++){
                            if(cos(this.spin.under.top[g]+this.anim.direction)>0){
                                this.layer.arc(5.5*sin(this.spin.under.top[g]+this.anim.direction)*this.anim.under.top.x,this.parts.under.top+3*this.anim.under.top.y,cos(this.spin.under.top[g]+this.anim.direction)*1.4*this.anim.under.top.x,3.5*this.anim.under.top.y,0,180)
                            }
                        }
                        for(let g=0,lg=2;g<lg;g++){
                            if(cos(this.spin.under.under.top[g]+this.anim.direction)>0){
                                this.layer.push()
                                this.layer.translate(5.5*sin(this.spin.under.under.top[g]+this.anim.direction),-50)
                                this.layer.rotate(-10*sin(this.spin.under.under.top[g]+this.anim.direction))
                                this.layer.scale(cos(this.spin.under.under.top[g]+this.anim.direction),1)
                                this.layer.rotate(45+g*45)
                                this.layer.fill(this.color.under.decoration,this.fade*this.fades.under.bottom)
                                for(let h=0;h<6;h++){
                                    this.layer.rotate(60)
                                    this.layer.ellipse(0,-0.6,0.4,1.2)
                                }
                                this.layer.pop()
                            }
                        }
                    }
                    if(this.trigger.display.under.under.bottom&&cos(this.spin.under.under.bottom[0]+this.anim.direction)>0){
                        this.layer.noStroke()
                        this.layer.fill(this.flashColor(mergeColor(this.color.skin.body,this.color.under.under.bottom[0],cos(this.spin.under.under.bottom[0]+this.anim.direction)))[0],this.flashColor(mergeColor(this.color.skin.body,this.color.under.under.bottom[0],cos(this.spin.under.under.bottom[0]+this.anim.direction)))[1],this.flashColor(mergeColor(this.color.skin.body,this.color.under.under.bottom[0],cos(this.spin.under.under.bottom[0]+this.anim.direction)))[2],this.fade*this.fades.under.under.bottom)
                        this.layer.beginShape()
                        this.layer.vertex(sin(this.spin.under.under.bottom[0]+this.anim.direction)*3.5,-35)
                        this.layer.bezierVertex(sin(this.spin.under.under.bottom[0]+this.anim.direction)*2.75,-33.5,sin(this.spin.under.under.bottom[1]*this.anim.under.under.bottom+this.anim.direction)*2.75,-34,sin(this.spin.under.under.bottom[1]*this.anim.under.under.bottom+this.anim.direction)*2.5,-33)
                        this.layer.bezierVertex(sin(this.spin.under.under.bottom[1]*this.anim.under.under.bottom+this.anim.direction)*2.25,-32,sin(this.spin.under.under.bottom[0]+this.anim.direction)*2.25,-32.5,sin(this.spin.under.under.bottom[0]+this.anim.direction)*1.5,-31)
                        this.layer.bezierVertex(sin(this.spin.under.under.bottom[0]+this.anim.direction)*2.25,-32.5,sin(this.spin.under.under.bottom[2]*this.anim.under.under.bottom+this.anim.direction)*2.25,-32,sin(this.spin.under.under.bottom[2]*this.anim.under.under.bottom+this.anim.direction)*2.5,-33)
                        this.layer.bezierVertex(sin(this.spin.under.under.bottom[2]*this.anim.under.under.bottom+this.anim.direction)*2.75,-34,sin(this.spin.under.under.bottom[0]+this.anim.direction)*2.75,-33.5,sin(this.spin.under.under.bottom[0]+this.anim.direction)*3.5,-35)
                        this.layer.endShape()
                        this.layer.fill(this.flashColor(mergeColor(this.color.skin.body,this.color.under.under.bottom[1],cos(this.spin.under.under.bottom[0]+this.anim.direction)))[0],this.flashColor(mergeColor(this.color.skin.body,this.color.under.under.bottom[1],cos(this.spin.under.under.bottom[0]+this.anim.direction)))[1],this.flashColor(mergeColor(this.color.skin.body,this.color.under.under.bottom[1],cos(this.spin.under.under.bottom[0]+this.anim.direction)))[2],this.fade*this.fades.under.under.bottom)
                        this.layer.beginShape()
                        this.layer.vertex(sin(this.spin.under.under.bottom[0]+this.anim.direction)*3.5,-35)
                        this.layer.bezierVertex(sin(this.spin.under.under.bottom[0]+this.anim.direction)*2.75,-33.5,sin(this.spin.under.under.bottom[3]*this.anim.under.under.bottom+this.anim.direction)*2.75,-34,sin(this.spin.under.under.bottom[3]*this.anim.under.under.bottom+this.anim.direction)*2.5,-33)
                        this.layer.bezierVertex(sin(this.spin.under.under.bottom[3]*this.anim.under.under.bottom+this.anim.direction)*2.25,-32,sin(this.spin.under.under.bottom[0]+this.anim.direction)*2.25,-32.5,sin(this.spin.under.under.bottom[0]+this.anim.direction)*1.5,-31)
                        this.layer.bezierVertex(sin(this.spin.under.under.bottom[0]+this.anim.direction)*2.25,-32.5,sin(this.spin.under.under.bottom[4]*this.anim.under.under.bottom+this.anim.direction)*2.25,-32,sin(this.spin.under.under.bottom[4]*this.anim.under.under.bottom+this.anim.direction)*2.5,-33)
                        this.layer.bezierVertex(sin(this.spin.under.under.bottom[4]*this.anim.under.under.bottom+this.anim.direction)*2.75,-34,sin(this.spin.under.under.bottom[0]+this.anim.direction)*2.75,-33.5,sin(this.spin.under.under.bottom[0]+this.anim.direction)*3.5,-35)
                        this.layer.endShape()
                    }
                    if(this.trigger.display.under.tanga){
                        this.sprites.temp=createGraphics(40,40)
                        setupLayer(this.sprites.temp)
                        this.sprites.temp.noStroke()
                        this.sprites.temp.fill(this.color.under.tanga[0],this.color.under.tanga[1],this.color.under.tanga[2],this.fade*this.fades.under.tanga)
                        if(abs(this.anim.direction)<this.spin.under.tanga){
                            this.sprites.temp.arc(20,2,18*sin(this.anim.direction+this.spin.under.tanga),36,0,90)
                            this.sprites.temp.arc(20,2,18*sin(this.anim.direction-this.spin.under.tanga),36,90,180)
                        }else if(this.anim.direction>=this.spin.under.tanga&&this.anim.direction<(this.spin.under.tanga+90)){
                            this.sprites.temp.arc(20,2,18*sin(this.anim.direction+this.spin.under.tanga),36,0,90)
                        }else if(this.anim.direction<=-this.spin.under.tanga&&this.anim.direction>-(this.spin.under.tanga+90)){
                            this.sprites.temp.arc(20,2,18*sin(this.anim.direction-this.spin.under.tanga),36,90,180)
                        }
                        if(abs(this.anim.direction)>=(180-this.spin.under.tanga)){
                            this.sprites.temp.arc(20,2,18*sin(this.anim.direction-(180-this.spin.under.tanga)),36,0,90)
                            this.sprites.temp.arc(20,2,18*sin(this.anim.direction+(180-this.spin.under.tanga)),36,90,180)
                        }else if(this.anim.direction>=-(180-this.spin.under.tanga)&&this.anim.direction<-(90-this.spin.under.tanga)){
                            this.sprites.temp.arc(20,2,18*sin(this.anim.direction-(180-this.spin.under.tanga)),36,0,90)
                        }else if(this.anim.direction<=(180-this.spin.under.tanga)&&this.anim.direction>(90-this.spin.under.tanga)){
                            this.sprites.temp.arc(20,2,18*sin(this.anim.direction+(180-this.spin.under.tanga)),36,90,180)
                        }
                        this.sprites.temp.erase()
                        this.sprites.temp.rect(20,6,40,11)
                        if(this.anim.direction>=this.spin.under.tanga&&this.anim.direction<(this.spin.under.tanga+90)){
                            this.sprites.temp.arc(20,2,18*sin(this.anim.direction-this.spin.under.tanga),36,0,90)
                        }else if(this.anim.direction<=-this.spin.under.tanga&&this.anim.direction>-(this.spin.under.tanga+90)){
                            this.sprites.temp.arc(20,2,18*sin(this.anim.direction+this.spin.under.tanga),36,90,180)
                        }
                        if(this.anim.direction>=-(180-this.spin.under.tanga)&&this.anim.direction<-(90-this.spin.under.tanga)){
                            this.sprites.temp.arc(20,2,18*sin(this.anim.direction+(180-this.spin.under.tanga)),36,0,90)
                        }else if(this.anim.direction<=(180-this.spin.under.tanga)&&this.anim.direction>(90-this.spin.under.tanga)){
                            this.sprites.temp.arc(20,2,18*sin(this.anim.direction-(180-this.spin.under.tanga)),36,90,180)
                        }
                        this.sprites.temp.noErase()
                        this.sprites.temp.rect(20,11,16,1/this.anim.under.bottom.y)
                        if(this.anim.under.bottom.y<=0){
                            this.layer.push()
                            this.layer.translate(0,this.parts.under.bottom-6*this.anim.under.bottom.y)
                            this.layer.scale(1,-1)
                            this.layer.image(this.sprites.temp,-10*this.anim.under.bottom.x,-5,20*this.anim.under.bottom.x,20*abs(this.anim.under.bottom.y))
                            this.layer.pop()
                        }else{
                            this.layer.image(this.sprites.temp,-10*this.anim.under.bottom.x,this.parts.under.bottom-5*this.anim.under.bottom.y-5,20*this.anim.under.bottom.x,20*abs(this.anim.under.bottom.y))
                        }
                    }
                    if(this.trigger.display.under.bottom){
                        this.sprites.temp=createGraphics(80,90)
                        setupLayer(this.sprites.temp)
                        this.sprites.temp.scale(2)
                        this.sprites.temp.fill(this.color.under.outside[0],this.color.under.outside[1],this.color.under.outside[2],this.fade*this.fades.under.bottom)
                        this.sprites.temp.noStroke()
                        if(abs(this.anim.direction)<this.spin.under.piece){
                            this.sprites.temp.arc(20,2,19*sin(this.anim.direction+this.spin.under.piece),40,0,90)
                            this.sprites.temp.arc(20,2,19*sin(this.anim.direction-this.spin.under.piece),40,90,180)
                        }else if(this.anim.direction>=this.spin.under.piece&&this.anim.direction<(this.spin.under.piece+90)){
                            this.sprites.temp.arc(20,2,19*sin(this.anim.direction+this.spin.under.piece),40,0,90)
                        }else if(this.anim.direction<=-this.spin.under.piece&&this.anim.direction>-(this.spin.under.piece+90)){
                            this.sprites.temp.arc(20,2,19*sin(this.anim.direction-this.spin.under.piece),40,90,180)
                        }
                        if(abs(this.anim.direction)>=(180-this.spin.under.piece)){
                            this.sprites.temp.arc(20,2,19*sin(this.anim.direction-(180-this.spin.under.piece)),40,0,90)
                            this.sprites.temp.arc(20,2,19*sin(this.anim.direction+(180-this.spin.under.piece)),40,90,180)
                        }else if(this.anim.direction>=-(180-this.spin.under.piece)&&this.anim.direction<-(90-this.spin.under.piece)){
                            this.sprites.temp.arc(20,2,19*sin(this.anim.direction-(180-this.spin.under.piece)),40,0,90)
                        }else if(this.anim.direction<=(180-this.spin.under.piece)&&this.anim.direction>(90-this.spin.under.piece)){
                            this.sprites.temp.arc(20,2,19*sin(this.anim.direction+(180-this.spin.under.piece)),40,90,180)
                        }
                        this.sprites.temp.erase()
                        this.sprites.temp.rect(20,6,40,11)
                        if(this.anim.direction>=this.spin.under.piece&&this.anim.direction<(this.spin.under.piece+90)){
                            this.sprites.temp.arc(20,2,19*sin(this.anim.direction-this.spin.under.piece),40,0,90)
                        }else if(this.anim.direction<=-this.spin.under.piece&&this.anim.direction>-(this.spin.under.piece+90)){
                            this.sprites.temp.arc(20,2,19*sin(this.anim.direction+this.spin.under.piece),40,90,180)
                        }
                        if(this.anim.direction>=-(180-this.spin.under.piece)&&this.anim.direction<-(90-this.spin.under.piece)){
                            this.sprites.temp.arc(20,2,19*sin(this.anim.direction+(180-this.spin.under.piece)),40,0,90)
                        }else if(this.anim.direction<=(180-this.spin.under.piece)&&this.anim.direction>(90-this.spin.under.piece)){
                            this.sprites.temp.arc(20,2,19*sin(this.anim.direction-(180-this.spin.under.piece)),40,90,180)
                        }
                        this.sprites.temp.noErase()
                        this.sprites.temp.rect(20,11,17.5,1/this.anim.under.bottom.y)
                        if(this.anim.under.bottom.y<=0){
                            this.layer.push()
                            this.layer.translate(0,this.parts.under.bottom-7*this.anim.under.bottom.y)
                            this.layer.scale(1,-1)
                            this.layer.image(this.sprites.temp,-10*this.anim.under.bottom.x,-5,20*this.anim.under.bottom.x,22.5*abs(this.anim.under.bottom.y))
                            this.layer.pop()
                        }else{
                            this.layer.image(this.sprites.temp,-10*this.anim.under.bottom.x,this.parts.under.bottom-6*this.anim.under.bottom.y-5,20*this.anim.under.bottom.x,22.5*abs(this.anim.under.bottom.y))
                        }
                        this.layer.fill(this.color.under.fringe[0],this.color.under.fringe[1],this.color.under.fringe[2],this.fade)
                        this.layer.noStroke()
                        for(let g=0,lg=this.spin.under.bottom.length;g<lg;g++){
                            if(cos(this.spin.under.bottom[g]+this.anim.direction)>0){
                                this.layer.arc(4.375*sin(this.spin.under.bottom[g]+this.anim.direction)*this.anim.under.bottom.x,this.parts.under.bottom-5.3*this.anim.under.bottom.y,cos(this.spin.under.bottom[g]+this.anim.direction)*1.4*this.anim.under.bottom.x,3.5*this.anim.under.bottom.y,0,180)
                            }
                        }
                        for(let g=0,lg=2;g<lg;g++){
                            if(cos(g*180+this.anim.direction)>0){
                                this.layer.push()
                                this.layer.translate(3*sin(g*180+this.anim.direction),-34)
                                this.layer.rotate(30*sin(g*180+this.anim.direction))
                                this.layer.scale(cos(g*180+this.anim.direction),1)
                                this.layer.rotate(15+g*25)
                                this.layer.fill(this.color.under.decoration,this.fade*this.fades.under.bottom)
                                for(let h=0;h<6;h++){
                                    this.layer.rotate(60)
                                    this.layer.ellipse(0,-0.6,0.4,1.2)
                                }
                                this.layer.pop()
                            }
                        }
                    }
                    if(this.trigger.display.under.bow.top){
                        this.layer.fill(this.color.under.bow[0],this.color.under.bow[1],this.color.under.bow[2],this.fade*this.fades.under.bow.top)
                        this.layer.stroke(this.color.under.bow[0],this.color.under.bow[1],this.color.under.bow[2],this.fade*this.fades.under.bow.top)
                        this.layer.strokeWeight(0.3)
                        if(cos(this.spin.underBow.top.center/2+this.spin.underBow.top.loop[0]/2+this.anim.direction)>0){
                            this.layer.triangle(
                                sin(this.spin.underBow.top.center+this.anim.direction)*5.75*this.anim.under.bow.top.position.x,this.parts.under.top+this.parts.under.bow.top*this.anim.under.bow.top.position.y,
                                sin(this.spin.underBow.top.loop[0]+this.anim.direction)*5.75*this.anim.under.bow.top.position.x,this.parts.under.top+(this.parts.under.bow.top-0.5)*this.anim.under.bow.top.position.y,
                                sin(this.spin.underBow.top.loop[0]+this.anim.direction)*5.75*this.anim.under.bow.top.position.x,this.parts.under.top+(this.parts.under.bow.top+0.5)*this.anim.under.bow.top.position.y
                            )
                        }
                        if(cos(this.spin.underBow.top.center/2+this.spin.underBow.top.loop[1]/2+this.anim.direction)>0){
                            this.layer.triangle(
                                sin(this.spin.underBow.top.center+this.anim.direction)*5.75*this.anim.under.bow.top.position.x,this.parts.under.top+this.parts.under.bow.top*this.anim.under.bow.top.position.y,
                                sin(this.spin.underBow.top.loop[1]+this.anim.direction)*5.75*this.anim.under.bow.top.position.x,this.parts.under.top+(this.parts.under.bow.top-0.5)*this.anim.under.bow.top.position.y,
                                sin(this.spin.underBow.top.loop[1]+this.anim.direction)*5.75*this.anim.under.bow.top.position.x,this.parts.under.top+(this.parts.under.bow.top+0.5)*this.anim.under.bow.top.position.y
                            )
                        }
                        this.layer.noFill()
                        if(cos(this.spin.underBow.top.center/2+this.spin.underBow.top.end[0]/2+this.anim.direction)>0){
                            this.layer.line(sin(this.spin.underBow.top.center+this.anim.direction)*5.75*this.anim.under.bow.top.position.x,this.parts.under.top+this.parts.under.bow.top*this.anim.under.bow.top.position.y,sin(this.spin.underBow.top.end[0]*this.anim.under.bow.top.size.x/this.anim.under.bow.top.position.x+this.anim.direction)*(5.75*this.anim.under.bow.top.position.x+0.25*this.anim.under.bow.top.size.x),this.parts.under.top+this.parts.under.bow.top*this.anim.under.bow.top.position.y+1.2*this.anim.under.bow.top.size.y)
                        }
                        if(cos(this.spin.underBow.top.center/2+this.spin.underBow.top.end[1]/2+this.anim.direction)>0){
                            this.layer.line(sin(this.spin.underBow.top.center+this.anim.direction)*5.75*this.anim.under.bow.top.position.x,this.parts.under.top+this.parts.under.bow.top*this.anim.under.bow.top.position.y,sin(this.spin.underBow.top.end[1]*this.anim.under.bow.top.size.x/this.anim.under.bow.top.position.x+this.anim.direction)*(5.75*this.anim.under.bow.top.position.x+0.25*this.anim.under.bow.top.size.x),this.parts.under.top+this.parts.under.bow.top*this.anim.under.bow.top.position.y+1.2*this.anim.under.bow.top.size.y)
                        }
                    }
                    if(this.trigger.display.under.bow.bottom){
                        this.layer.fill(this.color.under.bow[0],this.color.under.bow[1],this.color.under.bow[2],this.fade*this.fades.under.bow.bottom)
                        this.layer.stroke(this.color.under.bow[0],this.color.under.bow[1],this.color.under.bow[2],this.fade*this.fades.under.bow.bottom)
                        this.layer.strokeWeight(0.3)
                        if(cos(this.spin.underBow.bottom.center/2+this.spin.underBow.bottom.loop[0]/2+this.anim.direction)>0){
                            this.layer.triangle(
                                sin(this.spin.underBow.bottom.center+this.anim.direction)*4.5*this.anim.under.bow.bottom.position.x,this.parts.under.bottom+this.parts.under.bow.bottom*this.anim.under.bow.bottom.position.y,
                                sin(this.spin.underBow.bottom.loop[0]+this.anim.direction)*4.5*this.anim.under.bow.bottom.position.x,this.parts.under.bottom+(this.parts.under.bow.bottom-0.5)*this.anim.under.bow.bottom.position.y,
                                sin(this.spin.underBow.bottom.loop[0]+this.anim.direction)*4.5*this.anim.under.bow.bottom.position.x,this.parts.under.bottom+(this.parts.under.bow.bottom+0.5)*this.anim.under.bow.bottom.position.y
                            )
                        }
                        if(cos(this.spin.underBow.bottom.center/2+this.spin.underBow.bottom.loop[1]/2+this.anim.direction)>0){
                            this.layer.triangle(
                                sin(this.spin.underBow.bottom.center+this.anim.direction)*4.5*this.anim.under.bow.bottom.position.x,this.parts.under.bottom+this.parts.under.bow.bottom*this.anim.under.bow.bottom.position.y,
                                sin(this.spin.underBow.bottom.loop[1]+this.anim.direction)*4.5*this.anim.under.bow.bottom.position.x,this.parts.under.bottom+(this.parts.under.bow.bottom-0.5)*this.anim.under.bow.bottom.position.y,
                                sin(this.spin.underBow.bottom.loop[1]+this.anim.direction)*4.5*this.anim.under.bow.bottom.position.x,this.parts.under.bottom+(this.parts.under.bow.bottom+0.5)*this.anim.under.bow.bottom.position.y
                            )
                        }
                        this.layer.noFill()
                        if(cos(this.spin.underBow.bottom.center/2+this.spin.underBow.bottom.end[0]/2+this.anim.direction)>0){
                            this.layer.line(sin(this.spin.underBow.bottom.center+this.anim.direction)*4.5*this.anim.under.bow.bottom.position.x,this.parts.under.bottom+this.parts.under.bow.bottom*this.anim.under.bow.bottom.position.y,sin(this.spin.underBow.bottom.end[0]*this.anim.under.bow.bottom.size.x/this.anim.under.bow.bottom.position.x+this.anim.direction)*(4.5*this.anim.under.bow.bottom.position.x+0.25*this.anim.under.bow.bottom.size.x),this.parts.under.bottom+this.parts.under.bow.bottom*this.anim.under.bow.bottom.position.y+1.2*this.anim.under.bow.bottom.size.y)
                        }
                        if(cos(this.spin.underBow.bottom.center/2+this.spin.underBow.bottom.end[1]/2+this.anim.direction)>0){
                            this.layer.line(sin(this.spin.underBow.bottom.center+this.anim.direction)*4.5*this.anim.under.bow.bottom.position.x,this.parts.under.bottom+this.parts.under.bow.bottom*this.anim.under.bow.bottom.position.y,sin(this.spin.underBow.bottom.end[1]*this.anim.under.bow.bottom.size.x/this.anim.under.bow.bottom.position.x+this.anim.direction)*(4.5*this.anim.under.bow.bottom.position.x+0.25*this.anim.under.bow.bottom.size.x),this.parts.under.bottom+this.parts.under.bow.bottom*this.anim.under.bow.bottom.position.y+1.2*this.anim.under.bow.bottom.size.y)
                        }
                    }
                    if(this.trigger.display.kimono.main.back){
                        if(this.trigger.display.extra.damage){
                            this.layer.image(graphics.combatant[0].sprites.kimono.mainDamage.front[this.sprites.spinDetail],-15*this.fade*this.fades.kimono.main.back.x,this.parts.kimono.main-15*this.fades.kimono.main.back.y,30*this.fade*this.fades.kimono.main.back.x,66*this.fade*this.fades.kimono.main.back.y)
                        }else{
                            this.layer.image(graphics.combatant[0].sprites.kimono.main.front[this.sprites.spinDetail],-15*this.fade*this.fades.kimono.main.back.x,this.parts.kimono.main-15*this.fades.kimono.main.back.y,30*this.fade*this.fades.kimono.main.back.x,66*this.fade*this.fades.kimono.main.back.y)
                        }
                    }
                    if(this.trigger.display.kimono.decoration){
                        this.layer.noStroke()
                        for(let g=0,lg=this.kimono.decoration.length;g<lg;g++){
                            if(cos(this.kimono.decoration[g].spin+this.anim.direction)>0&&!(this.trigger.display.extra.damage&&this.kimono.decoration[g].y<20)){
                                this.layer.push()
                                this.layer.translate((1.5+this.kimono.decoration[g].y*0.16)*sin(this.kimono.decoration[g].spin+this.anim.direction)*this.fades.kimono.decoration.position.x,this.parts.kimono.main-13*this.fades.kimono.decoration.position.y+this.kimono.decoration[g].y*this.fades.kimono.decoration.position.y)
                                this.layer.rotate(-12*sin(this.kimono.decoration[g].spin+this.anim.direction))
                                this.layer.scale(this.fades.kimono.decoration.size.x*cos(this.kimono.decoration[g].spin+this.anim.direction),this.fades.kimono.decoration.size.y)
                                this.layer.rotate(this.kimono.decoration[g].rotate)
                                for(let h=0,lh=5;h<lh;h++){
                                    this.layer.fill(
                                        mergeColor(this.color.kimono.decoration[this.kimono.decoration[g].type],this.color.kimono.decoration[this.kimono.decoration[g].type+1],h/lh)[0],
                                        mergeColor(this.color.kimono.decoration[this.kimono.decoration[g].type],this.color.kimono.decoration[this.kimono.decoration[g].type+1],h/lh)[1],
                                        mergeColor(this.color.kimono.decoration[this.kimono.decoration[g].type],this.color.kimono.decoration[this.kimono.decoration[g].type+1],h/lh)[2],this.fade*this.fades.kimono.decoration.fade)
                                    for(let i=0;i<6;i++){
                                        this.layer.rotate(60)
                                        this.layer.ellipse(0,this.kimono.decoration[g].height*0.8,this.kimono.decoration[g].width*2.8*(1-h/lh),this.kimono.decoration[g].height*1.6*(1-h/lh))
                                    }
                                }
                                this.layer.pop()
                            }
                        }
                    }
                    if(this.trigger.display.kimono.outside.back){
                        if(this.trigger.display.extra.damage){
                            this.layer.image(graphics.combatant[0].sprites.kimono.outsideDamage.front[this.sprites.spinDetail],-15*this.fade*this.fades.kimono.outside.back.x,this.parts.kimono.outside-15*this.fades.kimono.outside.back.y,30*this.fade*this.fades.kimono.outside.back.x,66*this.fade*this.fades.kimono.outside.back.y)
                        }else{
                            this.layer.image(graphics.combatant[0].sprites.kimono.outside.front[this.sprites.spinDetail],-15*this.fade*this.fades.kimono.outside.back.x,this.parts.kimono.outside-15*this.fades.kimono.outside.back.y,30*this.fade*this.fades.kimono.outside.back.x,66*this.fade*this.fades.kimono.outside.back.y)
                        }
                    }
                    if(this.trigger.display.kimono.bow){
                        this.layer.noFill()
                        this.layer.stroke(this.color.kimono.bow[0],this.color.kimono.bow[1],this.color.kimono.bow[2],this.fade*this.fades.kimono.bow)
                        this.layer.strokeWeight(0.25)
                        if(this.trigger.display.extra.damage){
                            if(cos(this.anim.direction+this.spin.bow.loop[0]/2)>0){
                                this.layer.arc(sin(this.anim.direction+this.spin.bow.loop[0]/2)*5.4,this.parts.kimono.bow,cos(this.anim.direction+this.spin.bow.loop[0]/2)*2.4,2.4,0,135)
                            }
                            if(cos(this.anim.direction+this.spin.bow.loop[1]/2)>0){
                                this.layer.arc(sin(this.anim.direction+this.spin.bow.loop[1]/2)*5.4,this.parts.kimono.bow,cos(this.anim.direction+this.spin.bow.loop[1]/2)*2.4,2.4,45,180)
                            }
                            if(cos(this.anim.direction)>0){
                                this.layer.arc(sin(this.anim.direction)*5.5,this.parts.kimono.bow+1.2,cos(this.anim.direction)*2.4,2.4,-45,225)
                            }
                        }else{
                            if(cos(this.anim.direction+this.spin.bow.loop[0]/2)>0){
                                this.layer.ellipse(sin(this.anim.direction+this.spin.bow.loop[0]/2)*5.4,this.parts.kimono.bow,cos(this.anim.direction+this.spin.bow.loop[0]/2)*2.4,2.4)
                            }
                            if(cos(this.anim.direction+this.spin.bow.loop[1]/2)>0){
                                this.layer.ellipse(sin(this.anim.direction+this.spin.bow.loop[1]/2)*5.4,this.parts.kimono.bow,cos(this.anim.direction+this.spin.bow.loop[1]/2)*2.4,2.4)
                            }
                            if(cos(this.anim.direction)>0){
                                this.layer.ellipse(sin(this.anim.direction)*5.3,this.parts.kimono.bow-1.2,cos(this.anim.direction)*2.4,2.4)
                                this.layer.ellipse(sin(this.anim.direction)*5.5,this.parts.kimono.bow+1.2,cos(this.anim.direction)*2.4,2.4)
                            }
                        }
                    }
                    for(let g=0;g<2;g++){
                        if(this.trigger.display.extra.sword&&(cos(this.spin.arms[g].top+this.anim.direction)>=0.4&&cos(this.spin.arms[g].top+this.anim.direction)<0.6)&&g==1){
                            this.minorDisplay(0,g)
                        }
                        if(this.trigger.display.skin.arms&&cos(this.spin.arms[g].top+this.anim.direction)>-0.4&&cos(this.spin.arms[g].top+this.anim.direction)<0.6){
                            this.layer.stroke(this.flashColor(this.color.skin.arms)[0],this.flashColor(this.color.skin.arms)[1],this.flashColor(this.color.skin.arms)[2],this.fade*this.fades.skin.arms)
                            this.layer.strokeWeight(min(4,cos(this.spin.arms[g].top+this.anim.direction)*5+2))
                            this.layer.line(this.graphics.arms[g].topStack.x,this.graphics.arms[g].topStack.y,this.graphics.arms[g].middleStack.x,this.graphics.arms[g].middleStack.y)
                            this.layer.line(this.graphics.arms[g].middleStack.x,this.graphics.arms[g].middleStack.y,this.graphics.arms[g].bottomStack.x,this.graphics.arms[g].bottomStack.y)
                        }
                        if(this.trigger.display.band[1]&&cos(this.spin.arms[g].top+this.anim.direction)>-0.4&&cos(this.spin.arms[g].top+this.anim.direction)<0.6&&g==0){
                            this.minorDisplay(1,g)
                        }
                    }
                    if(this.trigger.display.skin.head){
                        this.layer.fill(this.flashColor(this.color.skin.head)[0],this.flashColor(this.color.skin.head)[1],this.flashColor(this.color.skin.head)[2],this.fade*this.fades.skin.head)
                        this.layer.noStroke()
                        this.layer.ellipse(0,-75,30,30)
                    }
                    if(this.trigger.display.mouth&&cos(this.anim.direction)>0){
                        this.minorDisplayGeneral(1,0)
                    }
                    for(let g=0;g<2;g++){
                        if(this.trigger.display.extra.sword&&(cos(this.spin.arms[g].top+this.anim.direction)>=0.6||cos(this.spin.arms[g].bottom+this.anim.direction)>=0.3)&&g==1){
                            this.minorDisplay(0,g)
                        }
                        if(this.trigger.display.skin.arms&&cos(this.spin.arms[g].top+this.anim.direction)>=0.6){
                            this.layer.stroke(this.flashColor(this.color.skin.arms)[0],this.flashColor(this.color.skin.arms)[1],this.flashColor(this.color.skin.arms)[2],this.fade*this.fades.skin.arms)
                            this.layer.strokeWeight(min(4,cos(this.spin.arms[g].top+this.anim.direction)*5+2))
                            this.layer.line(this.graphics.arms[g].topStack.x,this.graphics.arms[g].topStack.y,this.graphics.arms[g].middleStack.x,this.graphics.arms[g].middleStack.y)
                            this.layer.line(this.graphics.arms[g].middleStack.x,this.graphics.arms[g].middleStack.y,this.graphics.arms[g].bottomStack.x,this.graphics.arms[g].bottomStack.y)
                        }
                        if(this.trigger.display.skin.arms&&cos(this.spin.arms[g].bottom+this.anim.direction)>=0.3){
                            this.layer.stroke(this.flashColor(this.color.skin.arms)[0],this.flashColor(this.color.skin.arms)[1],this.flashColor(this.color.skin.arms)[2],this.fade*this.fades.skin.arms)
                            this.layer.strokeWeight(4)
                            this.layer.line(this.graphics.arms[g].middle.x,this.graphics.arms[g].middle.y,this.graphics.arms[g].bottom.x,this.graphics.arms[g].bottom.y)
                        }
                        if(this.trigger.display.band[1]&&(cos(this.spin.arms[g].top+this.anim.direction)>=0.6||cos(this.spin.arms[g].bottom+this.anim.direction)>=0.2)&&g==0){
                            this.minorDisplay(1,g)
                        }
                        if(this.trigger.display.eye[g]){
                            this.minorDisplayGeneral(0,g)
                        }
                    }
                    if(this.trigger.display.hair.front){
                        this.layer.image(graphics.combatant[0].sprites.hair.front[this.sprites.spinDetailHead],-25*this.fade,-75-20*this.fade,50*this.fade,100*this.fade)
                    }
                    if(this.trigger.display.hair.glow){
                        this.layer.noFill()
                        this.layer.stroke(this.color.hair.glow[0],this.color.hair.glow[1],this.color.hair.glow[2],this.fade/4)
                        for(let g=0;g<6;g++){
                            this.layer.strokeWeight((3-g/2)*this.fade)
                            this.layer.arc(0,-75,30+g,30+g,-72+g*6,-12-g*6)
                        }
                    }
                    if(this.trigger.display.flower[2]&&this.fades.flower[2]>0){
                        if(constrain((pow(cos(this.spin.flower[2]+this.anim.head),1.5)*2-0.2),0,1)>0){
                            this.layer.image(graphics.minor[19],sin(this.spin.flower[2]+this.anim.head)*18.5-5*this.fade*this.fades.flower[2]*constrain((pow(cos(this.spin.flower[2]+this.anim.head),1.5)*2-0.2),0,1),this.parts.flowerLevel[2]-5*this.fade*this.fades.flower[2],10*this.fade*this.fades.flower[2]*constrain((pow(cos(this.spin.flower[2]+this.anim.head),1.5)*2-0.2),0,1),10*this.fade*this.fades.flower[2])
                        }
                    }
                    if(this.trigger.display.flower[1]&&this.fades.flower[1]>0){
                        if(constrain((pow(cos(this.spin.flower[1]+this.anim.head),1.5)*2-0.2),0,1)>0){
                            this.layer.image(graphics.minor[18],sin(this.spin.flower[1]+this.anim.head)*18.5-8*this.fade*this.fades.flower[1]*constrain((pow(cos(this.spin.flower[1]+this.anim.head),1.5)*2-0.2),0,1),this.parts.flowerLevel[1]-8*this.fade*this.fades.flower[1],16*this.fade*this.fades.flower[1]*constrain((pow(cos(this.spin.flower[1]+this.anim.head),1.5)*2-0.2),0,1),16*this.fade*this.fades.flower[1])
                        }
                    }
                    if(this.trigger.display.flower[0]&&this.fades.flower[0]>0){
                        if(constrain((pow(cos(this.spin.flower[0]+this.anim.head),1.5)*2-0.2),0,1)>0){
                            if(this.trigger.display.extra.damage){
                                this.layer.image(graphics.minor[20],sin(this.spin.flower[0]+this.anim.head)*18.5-10*this.fade*this.fades.flower[0]*constrain((pow(cos(this.spin.flower[0]+this.anim.head),1.5)*2-0.2),0,1),this.parts.flowerLevel[0]-10*this.fade*this.fades.flower[0],20*this.fade*this.fades.flower[0]*constrain((pow(cos(this.spin.flower[0]+this.anim.head),1.5)*2-0.2),0,1),20*this.fade*this.fades.flower[0])
                            }else{
                                this.layer.image(graphics.minor[0],sin(this.spin.flower[0]+this.anim.head)*18.5-10*this.fade*this.fades.flower[0]*constrain((pow(cos(this.spin.flower[0]+this.anim.head),1.5)*2-0.2),0,1),this.parts.flowerLevel[0]-10*this.fade*this.fades.flower[0],20*this.fade*this.fades.flower[0]*constrain((pow(cos(this.spin.flower[0]+this.anim.head),1.5)*2-0.2),0,1),20*this.fade*this.fades.flower[0])
                            }
                        }
                    }
                break
                case 2:
                    for(let g=0;g<2;g++){
                        if(this.trigger.display.skin.arms&&cos(this.spin.arms[g].top+this.anim.direction)<=-0.3){
                            this.layer.stroke(this.flashColor(this.color.skin.arms)[0],this.flashColor(this.color.skin.arms)[1],this.flashColor(this.color.skin.arms)[2],this.fade*this.fades.skin.arms)
                            this.layer.strokeWeight(4)
                            this.layer.line(this.graphics.arms[g].top.x,this.graphics.arms[g].top.y,this.graphics.arms[g].middle.x,this.graphics.arms[g].middle.y)
                            this.layer.line(this.graphics.arms[g].middle.x,this.graphics.arms[g].middle.y,this.graphics.arms[g].bottom.x,this.graphics.arms[g].bottom.y)
                        }
                    }
                    if(this.trigger.display.skin.body){
                        this.layer.noStroke()
                        this.layer.fill(this.flashColor(this.color.skin.body)[0],this.flashColor(this.color.skin.body)[1],this.flashColor(this.color.skin.body)[2],this.fade*this.fades.skin.body)
                        this.layer.ellipse(0,-48,13,39)
                    }
                    for(let g=0;g<2;g++){
                        if(this.trigger.display.skin.arms&&cos(this.spin.arms[g].top+this.anim.direction)<0.4&&cos(this.spin.arms[g].top+this.anim.direction)>-0.3){
                            this.layer.stroke(this.flashColor(this.color.skin.arms)[0],this.flashColor(this.color.skin.arms)[1],this.flashColor(this.color.skin.arms)[2],this.fade*this.fades.skin.arms)
                            this.layer.strokeWeight(4)
                            this.layer.line(this.graphics.arms[g].top.x,this.graphics.arms[g].top.y,this.graphics.arms[g].middle.x,this.graphics.arms[g].middle.y)
                            this.layer.line(this.graphics.arms[g].middle.x,this.graphics.arms[g].middle.y,this.graphics.arms[g].bottom.x,this.graphics.arms[g].bottom.y)
                        }
                        for(let h=0;h<2;h++){
                            if((g==0&&h==0||g==1&&h==1)&&cos(this.spin.legs[0].bottom+this.anim.direction)<=cos(this.spin.legs[1].bottom+this.anim.direction)||(g==0&&h==1||g==1&&h==0)&&cos(this.spin.legs[0].bottom+this.anim.direction)>cos(this.spin.legs[1].bottom+this.anim.direction)){
                                if(this.trigger.display.skin.legs){
                                    this.layer.stroke(this.flashColor(this.color.skin.legs)[0],this.flashColor(this.color.skin.legs)[1],this.flashColor(this.color.skin.legs)[2],this.fade*this.fades.skin.legs)
                                    this.layer.strokeWeight(4)
                                    this.layer.line(this.graphics.legs[h].top.x,this.graphics.legs[h].top.y,this.graphics.legs[h].middle.x,this.graphics.legs[h].middle.y)
                                    this.layer.line(this.graphics.legs[h].middle.x,this.graphics.legs[h].middle.y,this.graphics.legs[h].bottom.x,this.graphics.legs[h].bottom.y)
                                }
                            }
                        }
                    }
                    for(let g=0;g<2;g++){
                        if(this.trigger.display.skin.arms&&cos(this.spin.arms[g].top+this.anim.direction)>-0.4&&cos(this.spin.arms[g].top+this.anim.direction)<0.6){
                            this.layer.stroke(this.flashColor(this.color.skin.arms)[0],this.flashColor(this.color.skin.arms)[1],this.flashColor(this.color.skin.arms)[2],this.fade*this.fades.skin.arms)
                            this.layer.strokeWeight(min(4,cos(this.spin.arms[g].top+this.anim.direction)*5+2))
                            this.layer.line(this.graphics.arms[g].topStack.x,this.graphics.arms[g].topStack.y,this.graphics.arms[g].middleStack.x,this.graphics.arms[g].middleStack.y)
                            this.layer.line(this.graphics.arms[g].middleStack.x,this.graphics.arms[g].middleStack.y,this.graphics.arms[g].bottomStack.x,this.graphics.arms[g].bottomStack.y)
                        }
                    }
                    if(this.trigger.display.skin.head){
                        this.layer.fill(this.flashColor(this.color.skin.head)[0],this.flashColor(this.color.skin.head)[1],this.flashColor(this.color.skin.head)[2],this.fade*this.fades.skin.head)
                        this.layer.noStroke()
                        this.layer.ellipse(0,-81,30,30)
                    }
                    if(this.trigger.display.mouth&&cos(this.anim.direction)>0){
                        this.minorDisplayGeneral(1,0)
                    }
                    for(let g=0;g<2;g++){
                        if(this.trigger.display.skin.arms&&cos(this.spin.arms[g].top+this.anim.direction)>=0.6){
                            this.layer.stroke(this.flashColor(this.color.skin.arms)[0],this.flashColor(this.color.skin.arms)[1],this.flashColor(this.color.skin.arms)[2],this.fade*this.fades.skin.arms)
                            this.layer.strokeWeight(min(4,cos(this.spin.arms[g].top+this.anim.direction)*5+2))
                            this.layer.line(this.graphics.arms[g].topStack.x,this.graphics.arms[g].topStack.y,this.graphics.arms[g].middleStack.x,this.graphics.arms[g].middleStack.y)
                            this.layer.line(this.graphics.arms[g].middleStack.x,this.graphics.arms[g].middleStack.y,this.graphics.arms[g].bottomStack.x,this.graphics.arms[g].bottomStack.y)
                        }
                        if(this.trigger.display.skin.arms&&cos(this.spin.arms[g].bottom+this.anim.direction)>=0.3){
                            this.layer.stroke(this.flashColor(this.color.skin.arms)[0],this.flashColor(this.color.skin.arms)[1],this.flashColor(this.color.skin.arms)[2],this.fade*this.fades.skin.arms)
                            this.layer.strokeWeight(4)
                            this.layer.line(this.graphics.arms[g].middle.x,this.graphics.arms[g].middle.y,this.graphics.arms[g].bottom.x,this.graphics.arms[g].bottom.y)
                        }
                        if(this.trigger.display.eye[g]){
                            this.minorDisplayGeneral(0,g)
                        }
                    }
                break
                default:
                    this.layer.rotate(-this.anim.direction)
                    this.layer.fill(255,255-this.team*255,255-this.team*255,this.fade)
                    this.layer.noStroke()
                    this.layer.triangle(-6,-8,6,-8,0,12)
                break
            }
            this.layer.pop()
        }
    }
    displayInfo(){
        if(this.fade>0&&this.infoAnim.size>0){
            this.layer.push()
            this.layer.translate(this.position.x+this.offset.life.x,this.position.y+this.offset.life.y)
            this.layer.scale(this.infoAnim.size)
            this.layer.noStroke()
            this.layer.fill(150,this.fade*this.infoAnim.life)
            this.layer.rect(0,0,50,6,3)
            if(this.collect.life>=this.life){
                this.layer.fill(240,0,0,this.fade*this.infoAnim.life)
                this.layer.rect((max(0,this.collect.life)/this.base.life)*25-25,0,(max(0,this.collect.life)/this.base.life)*50,2+min((max(0,this.collect.life)/this.base.life)*80,4),3)
                this.layer.fill(min(255,510-max(0,this.life)/this.base.life*510)-max(0,5-max(0,this.life)/this.base.life*30)*25,max(0,this.life)/this.base.life*510,0,this.fade*this.infoAnim.life)
                this.layer.rect((max(0,this.life)/this.base.life)*25-25,0,(max(0,this.life)/this.base.life)*50,2+min((max(0,this.life)/this.base.life)*80,4),3)
            }else if(this.collect.life<this.life){
                this.layer.fill(240,0,0,this.fade*this.infoAnim.life)
                this.layer.rect((max(0,this.life)/this.base.life)*25-25,0,(max(0,this.life)/this.base.life)*50,2+min((max(0,this.life)/this.base.life)*80,4),3)
                this.layer.fill(min(255,510-max(0,this.collect.life)/this.base.life*510)-max(0,5-max(0,this.collect.life)/this.base.life*30)*25,max(0,this.collect.life)/this.base.life*510,0,this.fade*this.infoAnim.life)
                this.layer.rect((max(0,this.collect.life)/this.base.life)*25-25,0,(max(0,this.collect.life)/this.base.life)*50,2+min((max(0,this.collect.life)/this.base.life)*80,4),3)
            }
            this.layer.noFill()
            this.layer.stroke(0,this.fade*this.infoAnim.life)
            this.layer.strokeWeight(0.75)
            this.layer.rect(0,0,51,6.75,3.75)
            this.layer.noStroke()
            if(this.infoAnim.block>0){
                this.layer.fill(0,this.fade*this.infoAnim.block)
                this.layer.ellipse(-28,0,11.5,11.5)
                this.layer.fill(150,175,200,this.fade*this.infoAnim.block)
                this.layer.ellipse(-28,0,10,10)
            }
            if(this.team==1){
                this.layer.fill(0,this.fade*this.infoAnim.life)
                this.layer.ellipse(28,0,11.5,11.5)
                this.layer.fill(200,100,100,this.fade*this.infoAnim.life)
                this.layer.ellipse(28,0,10,10)
            }
            for(let a=0,la=this.status.display.length;a<la;a++){
                displayStatusSymbol(this.layer,this.status.position[this.status.display[a]],12,this.status.display[a],0,this.status.size[this.status.display[a]],this.fade*this.infoAnim.life)
            }
            for(let a=0,la=this.attack.length;a<la;a++){
                displayIntentSymbol(this.layer,0,-12,this.attack[a].type,this.attack[a].effect,0,1,this.fade*this.infoAnim.intent[a])
            }
            this.layer.fill(0,this.fade*this.infoAnim.life)
            this.layer.textSize(6)
            this.layer.text(max(0,ceil(this.life*10)/10)+"/"+max(0,ceil(this.base.life*10)/10),0,0.5)
            if(this.infoAnim.block>0){
                this.layer.fill(0,this.fade*this.infoAnim.block)
                this.layer.text(ceil(this.block*10)/10,-28,0.5)
            }
            if(this.team==1){
                this.layer.fill(0,this.fade*this.infoAnim.life)
                this.layer.text(this.order,28,0.5)
            }
            this.layer.fill(0,this.fade*this.infoAnim.life)
            for(let a=0,la=this.status.display.length;a<la;a++){
                this.layer.textSize(8*this.status.size[this.status.display[a]])
                this.layer.text(this.status.main[this.status.display[a]],this.status.position[this.status.display[a]],12)
            }
            this.layer.pop()
        }
        if(this.fade>0&&this.infoAnim.description>0){
            if(this.team==0){
                this.layer.fill(mergeColor(types.color.card[this.type].fill,[150,150,150],0.5)[0],mergeColor(types.color.card[this.type].fill,[150,150,150],0.5)[1],mergeColor(types.color.card[this.type].fill,[150,150,150],0.5)[2],this.fade*this.infoAnim.description)
            }else{
                this.layer.fill(150,this.fade*this.infoAnim.description)
            }
            this.layer.noStroke()
            this.layer.rect(100,300,160,240,10)
            this.layer.fill(0,this.fade*this.infoAnim.description)
            this.layer.textSize(16)
            this.layer.text(this.name,100,200)
            this.layer.textSize(8)
            this.layer.text(this.description,100,240)
            this.layer.textSize(9)
            for(let a=0,la=min(6,this.status.display.length);a<la;a++){
                this.layer.text(this.status.main[this.status.display[a]],40,305+a*20)
            }
            this.layer.textSize(6)
            this.layer.textAlign(LEFT,CENTER)
            for(let a=0,la=min(6,this.status.display.length);a<la;a++){
                this.layer.text(this.status.name[this.status.display[a]],50,305+a*20)
            }
            if(this.team==1){
                for(let a=0,la=this.attack.length;a<la;a++){
                    this.layer.text(intentDescription(this.attack[g]),50,280)
                }
            }
            this.layer.textAlign(CENTER,CENTER)
            for(let a=0,la=min(6,this.status.display.length);a<la;a++){
                displayStatusSymbol(this.layer,40,305+a*20,this.status.display[a],0,this.status.size[this.status.display[a]]*1.5,this.fade*this.infoAnim.description*this.infoAnim.life)
            }
            if(this.team==1){
                for(let a=0,la=this.attack.length;a<la;a++){
                    displayIntentSymbol(this.layer,40,280,this.attack[a].type,this.attack[a].effect,0,1.5,this.fade*this.infoAnim.description*this.infoAnim.intent[a])
                }
            }
        }
    }
    update(){
        this.collect.life=this.collect.life*0.9+this.life*0.1
        if(this.team==0){
            this.fade=1
            if(this.life<=0&&!this.dead){
                this.dead=true
                this.battle.result.defeat=true
                this.startAnimation(7)
            }else if(this.life<=0){
                this.runAnimation(1/15,7)
            }
        }else{
            this.fade=smoothAnim(this.fade,this.life>0,0,1,15)
            this.infoAnim.life=smoothAnim(this.infoAnim.life,this.life>0,0,1,5)
            if(this.life<=0&&!this.dead){
                this.dead=true
                this.battle.combatantManager.reorder()
            }
        }
        if(this.team==1&&this.life>0&&!this.moved){
            let target=this.getTarget()
            switch(this.attack[this.intent].type){
                case 1:
                    if(target!=-1){
                        if(this.activated){
                            this.battle.tileManager.tiles[target].targetted[2]=true
                        }else{
                            this.battle.tileManager.tiles[target].targetted[1]=true
                        }
                    }
                break
            }
        }
        
        this.infoAnim.block=smoothAnim(this.infoAnim.block,this.block>0,0,1,5)
        this.infoAnim.size=smoothAnim(this.infoAnim.size,this.infoAnim.upSize,1,1.5,5)
        this.infoAnim.description=smoothAnim(this.infoAnim.description,this.infoAnim.upSize,0,1,5)
        if(abs(this.anim.direction-this.goal.anim.direction)<=18||abs(this.anim.direction-this.goal.anim.direction-180)<=18||abs(this.anim.direction-this.goal.anim.direction+180)<=18||abs(this.anim.direction-this.goal.anim.direction-360)<=18||abs(this.anim.direction-this.goal.anim.direction+360)<=18){
            this.anim.direction=this.goal.anim.direction
        }else if(
            this.anim.direction>this.goal.anim.direction&&this.anim.direction<this.goal.anim.direction+180||
            this.anim.direction>this.goal.anim.direction-360&&this.anim.direction<this.goal.anim.direction-180||
            this.anim.direction>this.goal.anim.direction+360&&this.anim.direction<this.goal.anim.direction+540||
            this.anim.direction>this.goal.anim.direction-720&&this.anim.direction<this.goal.anim.direction-540||
            this.anim.direction>this.goal.anim.direction+720&&this.anim.direction<this.goal.anim.direction+900
        ){
            this.anim.direction-=15
        }else if(
            this.anim.direction<this.goal.anim.direction&&this.anim.direction>this.goal.anim.direction-180||
            this.anim.direction<this.goal.anim.direction+360&&this.anim.direction>this.goal.anim.direction+180||
            this.anim.direction<this.goal.anim.direction-360&&this.anim.direction>this.goal.anim.direction-540||
            this.anim.direction<this.goal.anim.direction+720&&this.anim.direction>this.goal.anim.direction+540||
            this.anim.direction<this.goal.anim.direction-720&&this.anim.direction>this.goal.anim.direction-900
        ){
            this.anim.direction+=15
        }else{
            this.anim.direction+=15*(floor(random(0,2)*2-1))
        }
        if(this.anim.direction>180){
            this.anim.direction-=360
        }
        if(this.anim.direction<-180){
            this.anim.direction+=360
        }
        for(let a=0,la=this.status.main.length;a<la;a++){
            if(this.status.main[a]!=0&&!this.status.active[a]){
                this.status.active[a]=true
                this.status.size[a]=0
                this.status.position[a]=this.status.display.length*6
                this.status.display.push(a)
            }
            if(this.status.active[a]){
                this.status.size[a]=smoothAnim(this.status.size[a],this.status.main[a]!=0,0,1,5)
            }
        }
        for(let a=0,la=this.status.display.length;a<la;a++){
            if(abs(this.status.position[this.status.display[a]]-(a*12-(la-1)*6))<2){
                this.status.position[this.status.display[a]]=a*12-(la-1)*6
            }else if(abs(this.status.position[this.status.display[a]]<a*12-(la-1)*6)){
                this.status.position[this.status.display[a]]+=2
            }else if(abs(this.status.position[this.status.display[a]]>a*12-(la-1)*6)){
                this.status.position[this.status.display[a]]-=2
            }
            if(this.status.main[this.status.display[a]]==0&&this.status.size[this.status.display[a]]<=0){
                this.status.active[this.status.display[a]]=false
                this.status.display.splice(a,1)
            }
        }
        for(let a=0,la=this.infoAnim.intent.length;a<la;a++){
            this.infoAnim.intent[a]=smoothAnim(this.infoAnim.intent[a],a==this.intent,0,1,5)
        }
        for(let a=0,la=this.infoAnim.flash.length;a<la;a++){
            this.infoAnim.flash[a]=smoothAnim(this.infoAnim.flash[a],this.infoAnim.upFlash[a],0,1,5)
            if(this.infoAnim.flash[a]>=1&&this.infoAnim.upFlash[a]){
                this.infoAnim.upFlash[a]=false
            }
        }
        switch(this.type){
            case 1:
                this.anim.head=this.anim.direction
                this.anim.sword=smoothAnim(this.anim.sword,this.goal.anim.sword,0,1,5)
                if(this.anim.direction>180){
                    this.anim.direction-=360
                }else if(this.anim.direction<-180){
                    this.anim.direction+=360
                }
                if(this.life<=this.base.life*0.2){
                    this.trigger.display.extra.damage=true
                }else{
                    this.trigger.display.extra.damage=false
                }
            break
            case 2:
                this.anim.head=this.anim.direction
            break
        }
    }
}