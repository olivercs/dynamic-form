import React from 'react';
import {mapValues, keyBy} from 'lodash';

export default class DynamicFormHelper {

    constructor() {
        this.list = [];
    }

    register(...Components) {

        Components.forEach(Component => {
            this.list[Component.name] = Component;
        })

    }

    *walk(node) {

        if (node.children && node.children.length) {

            for (let childNode of node.children) {
                yield childNode;
            }
        }

        yield node;

    }

    renderNode(node, defaultProps = {}, closureProps = {}) {

        let children = null;
        const resolvedClosureProps = mapValues(closureProps, prop => prop(node));

        const props = { ...defaultProps, ...resolvedClosureProps, ...node.props };

        if (!this.list[node.type]) {
            throw new Error('node type is not registered.');
        }

        if (node.children && node.children.length) {
            children = node.children.map(childNode => this.renderNode(childNode, defaultProps, closureProps));
        }

        return React.createElement(this.list[node.type], props, children);

    }

    buildTree(entities) {

        const entitiesByName = keyBy(entities, 'name');
        let root = null;

        for (let name in entitiesByName) {

            let entity = entitiesByName[name];

            if (entity.parent) {
                let parent = entitiesByName[entity.parent];
                if (!parent.children) {
                    parent.children = [];
                }
                parent.children.push(entity);
            } else {
                root = entity;
            }
        }

        return root;
    }
}