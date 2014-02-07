Bon matin !


Voici les étapes pour faire marcher le site:

Faire marcher Play

	- Télécharger Play 1.2.5
		http://download.playframework.org/releases/play-1.2.5.zip
		
	- L'extraire quelque part.
		Ex: C:\play
	
	- Ajouter le dossier de play dans votre variable PATH
		http://java.com/en/download/help/path.xml
		
	- Ouvrir un command prompt (cmd.exe)
	
	- Tapper:   play
		Si ça ne marche pas ben t'as pas bien fait les étapes précédentes, recommence !
	
	
Initialiser le projet

	- Dans command prompt, aller dans le dossier du site web.
		Ex: cd c:\2013.lanets.ca
		
	- Tapper: play deps 
		Ça met à jour les dépendences pour le site web
		
	- Créer le fichier suivant:
		conf\local.conf
		
Pour créer un projet qui s'ouvre dans votre ide préféré

	- Dans command prompt, aller dans le dossier du site web.
		Ex: cd c:\2013.lanets.ca
		
	- Pour Netbeans
		Tapper:  play netbeansify
	
	- Pour Eclipse
		Tapper:  play eclipsify
		
Pour rouler le site web

	- Dans command prompt, aller dans le dossier du site web.
		Ex: cd c:\2013.lanets.ca
		
	- Tapper:  play run
		Ça devrait compiler et partir le projet
		
	Accèder au site: http://localhost:9000
		
		
Configurations spéciales

	- Pour rouler une base de données en mémoire, ajouter la config suivante dans conf/local.conf
		db=mem
		
		Pour créer les données de test, il faut accèder à la page suivante:
			http://localhost:9000/createTestUser
	
	- Pour voir les requetes SQL ajouter la config suivante dans conf/local.conf
		jpa.debugSQL=true