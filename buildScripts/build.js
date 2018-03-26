import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import chalk from 'chalk';

process.env.NODE_Env = 'production'; //to inform libs about environment, Babel, etc

console.log(chalk.blue("Generating minified bundle for production. This will take a moment..."))

webpack(webpackConfig).run((err,stats)=>{
	if(err){
		console.log(chalk.red(err));
		return 1;
	}

	const jsonStats = stats.toJson();

	if(jsonStats.hasErrors){
		return jsonStats.errors.map(error=> console.log(chalk.red(error)));
	}

	if(jsonStats.hasWarnings){
		console.log(chalk.yellow("Webpack genarated the folowing warnings:"))
		return jsonStats.warnings.map(warning=> console.log(chalk.yellow(warning)));
	}

	console.log(`Webpack stats: ${stats}`);
	//message on succesful prioduction build
	console.log(chalk.green("Your app has been build for production. Output -> /dist"));

	return 0;
})
