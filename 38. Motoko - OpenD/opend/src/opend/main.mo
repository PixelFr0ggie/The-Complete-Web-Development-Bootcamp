import Cycles "mo:base/ExperimentalCycles";
import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import NFTActorClass "../NFT/nft";
import HashMap "mo:base/HashMap";
import List "mo:base/List";
import Iter "mo:base/Iter";

actor OpenD {

    private type Listing = {
        itemOwner: Principal;
        itemPrice: Nat;        
    };

    var mapOfNFTs = HashMap.HashMap<Principal, NFTActorClass.NFT> (1, Principal.equal, Principal.hash);
    var mapOfOwners = HashMap.HashMap<Principal, List.List<Principal>> (1, Principal.equal, Principal.hash);
    var mapOfListings = HashMap.HashMap<Principal, Listing> (1, Principal.equal, Principal.hash);

    public shared(msg) func mint(imageData: [Nat8], name: Text) : async Principal {

        let owner : Principal = msg.caller;

        Debug.print(debug_show(Cycles.balance()));
        Cycles.add(100_500_000_000);

        let newNFT = await NFTActorClass.NFT(name, owner, imageData);

        let newNFTPrincipal = await newNFT.getCanisterId();  

        mapOfNFTs.put(newNFTPrincipal, newNFT);
        addToOwnershipMap(owner, newNFTPrincipal);

        return newNFTPrincipal;
    };

    private func addToOwnershipMap(owner: Principal, nftId: Principal) {

        var ownedNFTs : List.List<Principal> = switch (mapOfOwners.get(owner)) {
            case null List.nil<Principal>();
            case (?result) result; 
        };

        ownedNFTs := List.push(nftId, ownedNFTs);
        mapOfOwners.put(owner, ownedNFTs);
    };

    public query func getOwnedNFTs(user: Principal) : async [Principal] {

        var userNFTs : List.List<Principal> = switch (mapOfOwners.get(user)) {
            case null List.nil<Principal>();
            case (?result) result;
        };

        return List.toArray(userNFTs);

    };

    public query func getListedNFTs() : async [Principal] {

        let ids = Iter.toArray(mapOfListings.keys());
        return ids;
    };

    public shared(msg) func listItem(id: Principal, price: Nat) : async Text {
        
        var item : NFTActorClass.NFT = switch (mapOfNFTs.get(id)) {
            case null return "NFT does not exist";
            case (?result) result; 
        };

        let owner = await item.getOwner();

        if (Principal.equal(owner, msg.caller)) {

            let newListing : Listing = {
                itemOwner = owner;
                itemPrice = price;
            };

            mapOfListings.put(id, newListing);

            return "Success";

        } else {

            return "You don't own the NFT";

        }        
    };     

    public query func isListed(id: Principal) : async Bool {

        if (mapOfListings.get(id) == null) {
            return false;
        } else {
            return true;
        }
    };

    public query func getOpenDCanisterID() : async Principal {
        return Principal.fromActor(OpenD);
    }; 

    public query func getOriginalOwner(id: Principal) : async Principal {

        var listing : Listing = switch (mapOfListings.get(id)) {            
            case null return Principal.fromText("");
            case (?result) result;
        };

        return listing.itemOwner;

    };

    public query func getListedNFTPrice(id: Principal) : async Nat {

        var listing : Listing = switch (mapOfListings.get(id)) {            
            case null return 0;
            case (?result) result;
        };

        return listing.itemPrice;
    };

    public shared(msg) func completePurchase(id: Principal, ownerId: Principal, newOwnerId: Principal) : async Text {

        var purchasedNFT : NFTActorClass.NFT = switch (mapOfNFTs.get(id)) {
            case null return "NFT does not exist";
            case (?result) result;
        };

        let transferResult = await purchasedNFT.transferOwnership(newOwnerId);
        if (transferResult == "Success") {

            mapOfListings.delete(id);
            var ownedNFTs : List.List<Principal> = switch (mapOfOwners.get(ownerId)) {
                case null List.nil<Principal> ();
                case (?result) result;
            }; 

            ownedNFTs := List.filter(ownedNFTs, func (listItemId: Principal) : Bool {                
                return listItemId != id;
            });

            mapOfOwners.put(ownerId, ownedNFTs);

            addToOwnershipMap(newOwnerId, id);

            return "Success";
        } else {

            return transferResult;

        }
    };
 
};

// dfx deploy --argument='("CryptoDunks #123", principal "2rk4m-ag4de-q5jka-yzwkv-gusm3-mpxkh-lpw2g-izm3h-3xtql-icgdl-7qe", (vec {137; 80; 78; 71; 13; 10; 26; 10; 0; 0; 0; 13; 73; 72; 68; 82; 0; 0; 0; 10; 0; 0; 0; 10; 8; 6; 0; 0; 0; 141; 50; 207; 189; 0; 0; 0; 1; 115; 82; 71; 66; 0; 174; 206; 28; 233; 0; 0; 0; 68; 101; 88; 73; 102; 77; 77; 0; 42; 0; 0; 0; 8; 0; 1; 135; 105; 0; 4; 0; 0; 0; 1; 0; 0; 0; 26; 0; 0; 0; 0; 0; 3; 160; 1; 0; 3; 0; 0; 0; 1; 0; 1; 0; 0; 160; 2; 0; 4; 0; 0; 0; 1; 0; 0; 0; 10; 160; 3; 0; 4; 0; 0; 0; 1; 0; 0; 0; 10; 0; 0; 0; 0; 59; 120; 184; 245; 0; 0; 0; 113; 73; 68; 65; 84; 24; 25; 133; 143; 203; 13; 128; 48; 12; 67; 147; 94; 97; 30; 24; 0; 198; 134; 1; 96; 30; 56; 151; 56; 212; 85; 68; 17; 88; 106; 243; 241; 235; 39; 42; 183; 114; 137; 12; 106; 73; 236; 105; 98; 227; 152; 6; 193; 42; 114; 40; 214; 126; 50; 52; 8; 74; 183; 108; 158; 159; 243; 40; 253; 186; 75; 122; 131; 64; 0; 160; 192; 168; 109; 241; 47; 244; 154; 152; 112; 237; 159; 252; 105; 64; 95; 48; 61; 12; 3; 61; 167; 244; 38; 33; 43; 148; 96; 3; 71; 8; 102; 4; 43; 140; 164; 168; 250; 23; 219; 242; 38; 84; 91; 18; 112; 63; 0; 0; 0; 0; 73; 69; 78; 68; 174; 66; 96; 130;}))'
