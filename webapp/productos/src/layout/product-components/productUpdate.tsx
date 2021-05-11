import React, { useState } from 'react'
import { Modal, Segment, Header, Input, Grid, Button, TextArea, Image } from 'semantic-ui-react';
import { RouteComponentProps } from 'react-router-dom';
import { useFirebaseApp } from 'reactfire';

interface IProductUpdateProps extends RouteComponentProps<{ id: string }>{}

interface IProductUpdateState {
    isNew: boolean,
    id?: string | null,
    product: string,
    imageBase64: string | ArrayBuffer | null,
    category: string,
    description: string,
    isLoading: boolean
}

const ProductUpdate = (props: IProductUpdateProps) => {
    const [state, setState] = useState<IProductUpdateState>({
        isNew: !props.match.params || !props.match.params.id,
        id: !props.match.params.id ? null : props.match.params.id,
        product: '',
        imageBase64: '',
        category: '',
        description: '',
        isLoading: false
    });

    const firebase = useFirebaseApp();

    const onSave = async() => {
        const product = {
            id: state.id,
            product: state.product,
            imageBase64: state.imageBase64,
            category: state.category,
            description: state.description
        }
            await firebase.database().ref('products').push(product)
              .then(response => {
                cleanFields();
                console.log("The product has been created" + response);
                props.history.push("/")
              })
              .catch((error:any) => {
                console.log(error)
              })
        
    }

    const cleanFields = () => {
        setState({
            isNew: true,
            id: null,
            product: "",
            imageBase64: "",
            category: "",
            description: "",
            isLoading: false
        })
    }

    const onChange = (e: any) => {
        console.log("file", e.target.files[0]);
        let file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = _handleReaderLoaded
          reader.readAsBinaryString(file)
        }
    }

    const _handleReaderLoaded = (readerEvt: any) => {
        let binaryString = readerEvt.target.result;
        setState({...state, imageBase64: btoa(binaryString)})
    }

    const onFileSubmit = (e: any) => {
        setState({...state, isLoading: true});
        e.preventDefault()
        console.log("bine", state.imageBase64)
        let payload = { image: state.imageBase64 }
        console.log("payload", payload)
    
        setTimeout(() => {
        setState({...state, isLoading: false});
        }, 2000)
    
    }
    
    return(
        <Modal
            open
            size="tiny"
        >
                <Segment textAlign="center">
                    <Header dividing>
                        <Header.Content>{state.id ? "Agregar producto" : "Editar producto"}</Header.Content>
                    </Header>
                        {state.imageBase64 !== "" ? 
                            <Image src={"data:image/jpeg;base64,"+state.imageBase64} size="tiny" centered style={{ margintBottom: '5px'}}/>
                        : null}
                        <Grid columns={1}>
                        <Grid.Row>
                            <Grid.Column>
                                <Input 
                                    placeholder="Product" 
                                    value={state.product} 
                                    icon="product hunt" 
                                    style={{ width: '100%'}}
                                    onChange={event => setState({...state, product: event.target.value})}
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Input 
                                    placeholder="Category" 
                                    value={state.category} 
                                    icon="th" 
                                    style={{ width: '100%'}}
                                    onChange={event => setState({...state, category: event.target.value})}
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Input
                                    placeholder="Image"
                                    icon="file image" 
                                    type="file" 
                                    onSubmit={(e:any) => onFileSubmit(e)} 
                                    onChange={(e) => onChange(e)} 
                                    style={{ width: '100%'}}
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <TextArea
                                    rows={8} 
                                    placeholder="Description" 
                                    value={state.description} 
                                    icon="pencil" 
                                    style={{ width: '100%'}}
                                    onChange={event => setState({...state, description: event.target.value})}
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Button color="red">Cancel</Button>
                                <Button 
                                    color="green" 
                                    onClick={onSave}
                                >Save</Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
        </Modal>
    )
}

export default ProductUpdate;