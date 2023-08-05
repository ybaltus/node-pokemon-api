const pokemonTypes = [
    'Plante',
    'Poison',
    'Feu',
    'Eau',
    'Vol',
    'Herbe',
    'Normal',
    'Electrik',
    'Fée',
    'Insecte'
]

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "The name already exists."
            },
            validate: {
                notEmpty: { msg: 'You name cannot be empty.'},
                notNull: { msg: 'The name is required.'},
                len: [1, 25]
            }
        },
        hp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: 'You must only use integer for hp.'},
                notNull: { msg: 'The hp field is required.'},
                min: {
                    args: [0],
                    msg: "The hp must be superior or equals to 0."
                },
                max: {
                    args: [999],
                    msg: "The hp must be inferior or equals to 999."
                }
            }
        },
        cp: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: { msg: 'You must only use integer for cp.'},
                notNull: { msg: 'The cp field is required.'},
                min: {
                    args: [0],
                    msg: "The cp must be superior or equals to 0."
                },
                max: {
                    args: [99],
                    msg: "The cp must be inferior or equals to 99."
                }
            }
        },
        picture: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: { msg: 'The picture must be an validate url.'},
                notNull: { msg: 'The picture is required.'}
            }
        },
        types: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isTypesValid(value){
                    if(!value){
                        throw new Error("A pokemon must have at least one type.");
                    }

                    const valueSplit = value.split(',');

                    if((valueSplit.length > 3)) {
                        throw new Error("A pokemon must have 3 maximum types.");
                    }

                    valueSplit.forEach(element => {
                        if(!pokemonTypes.includes(element)){
                            throw new Error(`You must use a valid types : ${pokemonTypes}`)
                        }
                    })
                }
            },
            get() {
                return this.getDataValue('types').split(',')
            },
            set(types) {
                this.setDataValue('types', types.join())
            }
        }
    }, {
        timestamps: true
    })
}