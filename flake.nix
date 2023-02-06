{
  description = "nix proj";

  inputs.fu.url = "github:numtide/flake-utils";

  outputs = { self, nixpkgs, fu}:
    fu.lib.simpleFlake {
      inherit self nixpkgs;
      name = "nix proj";

      systems = fu.lib.defaultSystems;

      shell = ({ pkgs }: pkgs.mkShell {
        packages = with pkgs; [
          nodejs
          nodePackages.nodemon
        ];
      });
    };
}
