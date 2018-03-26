import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default{
	debug:true,
	devtool:'source-map',
	noInfo:false,
	entry:{
		vendor:path.resolve(__dirname, 'src/vendor'),
		main:path.resolve(__dirname, 'src/index')
	}
	,
	target:'web',
	output:{
		path:path.resolve(__dirname,'dist'),
		publicPath:'/',
		filename:'[name].[chunkhash].js'//cant hard-code as we are splitting vendors from the rest, chonkhash is generated by MD% plug
	},
	plugins:[
		//for cache-busting, changes the file name only when bundle contents change
		new WebpackMd5Hash(),

		//generate external css and make name with hash for chache busting
		new ExtractTextPlugin('[name].[contenthash].css'),

		//Minify js
		new webpack.optimize.UglifyJsPlugin(),

		//bundle splitting plugin, generates separate bundle for 3rd party libs
		new webpack.optimize.CommonsChunkPlugin({
			name:"vendor"
		}),

		//Eliminate duplicates when bundling
		new webpack.optimize.DedupePlugin(),

		//for HTML manipulation for production builds
		new HtmlWebpackPlugin({
			template:'src/index.html',
			inject:true, //injects script tags for you :)
			minify:{
				removeComments:true,
				collapseWhitespace:true,
				removeRedundantAttributes:true,
				useShortDoctype:true,
				removeEmptyAttributes:true,
				keepClosingSlash:true,
				minifyJS:true,
				minifyCSS:true,
				minifyURLs:true
			},

			trackJSToken: 'f75f2425ba7645bd8b08f7c94ebb1f88'
		})
	],
	module:{
		loaders:[
			{test:/\.js$/, exclude:/node_modules/,loaders:['babel']},
			{test:/\.css$/,loader:ExtractTextPlugin.extract('css?sourceMap')}
			//{test:/\.css$/,loaders:['style','css']}
		]
	}
}
