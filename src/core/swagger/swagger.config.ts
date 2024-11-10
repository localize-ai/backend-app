import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export class SwaggerConfig {

    static config(app) {
        if (process.env.NODE_ENV === 'production') {
            return;
        }

        const config = new DocumentBuilder()
            .setTitle('Localize API')
            .setDescription('Localize API documentation')
            .setVersion('1.0')
            .addBearerAuth()
            .build();

        const document = SwaggerModule.createDocument(app, config);

        SwaggerModule.setup('docs', app, document, {
            swaggerOptions: {
                persistAuthorization: true,
            }
        });
    }
}