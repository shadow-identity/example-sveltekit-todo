import * as graphql from 'graphql'
import * as recast from 'recast'

import { Config, walkGraphQLTags } from '../../common'
import { store_import } from '../imports'
import { TransformPage } from '../plugin'

const AST = recast.types.builders

export default async function GraphQLTagProcessor(config: Config, page: TransformPage) {
	// all graphql template tags need to be turned into a reference to the appropriate store
	await walkGraphQLTags(config, page.script, {
		dependency: page.watch_file,
		tag(tag) {
			// pull out what we need
			const { node, parsedDocument } = tag
			const operation = config.extractDefinition(parsedDocument)

			// we're going to turn the graphql tag into a reference to the document's
			// store
			node.replaceWith(
				store_import({
					page,
					artifact: { name: operation.name!.value },
				}).id
			)
		},
	})
}