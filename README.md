Bon matin !


Voici les �tapes pour faire marcher le site:

Faire marcher Play

	- T�l�charger Play 1.2.5
		http://download.playframework.org/releases/play-1.2.5.zip
		
	- L'extraire quelque part.
		Ex: C:\play
	
	- Ajouter le dossier de play dans votre variable PATH
		http://java.com/en/download/help/path.xml
		
	- Ouvrir un command prompt (cmd.exe)
	
	- Tapper:   play
		Si �a ne marche pas ben t'as pas bien fait les �tapes pr�c�dentes, recommence !
	
	
Initialiser le projet

	- Dans command prompt, aller dans le dossier du site web.
		Ex: cd c:\2013.lanets.ca
		
	- Tapper: play deps 
		�a met � jour les d�pendences pour le site web
		
	- Cr�er le fichier suivant:
		conf\local.conf
		
Pour cr�er un projet qui s'ouvre dans votre ide pr�f�r�

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
		�a devrait compiler et partir le projet
		
	Acc�der au site: http://localhost:9000
		
		
Configurations sp�ciales

	- Pour rouler une base de donn�es en m�moire, ajouter la config suivante dans conf/local.conf
		db=mem
		
		Pour cr�er les donn�es de test, il faut acc�der � la page suivante:
			http://localhost:9000/createTestUser
	
	- Pour voir les requetes SQL ajouter la config suivante dans conf/local.conf
		jpa.debugSQL=true