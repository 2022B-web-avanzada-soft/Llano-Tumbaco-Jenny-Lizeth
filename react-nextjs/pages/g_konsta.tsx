import {App, BlockTitle, List, ListItem, Navbar, Page} from "konsta/react"

export default function (){
    return(<>
        <App theme="ios">
            <Page>
                <Navbar
                    title="List"
                    />
                <BlockTitle> Links, header, Footer</BlockTitle>
                <List strongIos outlineIos>
                    <ListItem
                        link
                        header="Nane"
                        title="Jhon Doe"
                        after="Edit"
                    />
                </List>
            </Page>
        </App>
        </>
    )
}