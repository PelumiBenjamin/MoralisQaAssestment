export const NodeSelectors = {
    nodeNavigation: { role: 'button' as const, name: 'Nodes' },
    ethNodeButton: { role: 'button' as const, name: 'Ethereum' },
    attribute: 'aria-expanded',
    region:'region' as const, 
    individualNodes:'textbox' as const,
    createNewNode: { role: 'button' as const, name: 'Create a New Node' },
    selectProtocol: 'data-testid=test-CardCountrySelect',
    selectNetwork: 'data-testid=mui-select',
    createNode: { role: 'button' as const, name: 'Create Node' },
};